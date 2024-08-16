import { getListEpisodes } from "./logic/get-list-episodes.ts"
import { getServersEpisode } from "./logic/get-servers-episode.ts"
import { getConfServer } from "./logic/get-conf-server.ts"
import { getSource } from "./logic/get-source.ts"

import { Hono } from "hono"
import { cors } from "hono/cors"
import { Cache } from "ttl_cache"
import { searchAnime } from "./logic/search-anime.ts"
import { rangeEmpty } from "./logic/range-empty.ts"

const app = new Hono()
const kv = await Deno.openKv?.()
const cache = new Cache<string, unknown>(30 * 60 * 1000) // 30 minutes

const optsOrigin = [
  "https://animevsub.eu.org",
  "https://animevsub.netlify.app",
  "http://localhost:9000",
  "http://localhost:9200"
]
app.use(
  "*",
  cors({
    origin: (origin, c) => {
      return optsOrigin.includes(origin)
        ? origin
        : c.req.header("x-requested-with") === "git.shin.animevsub"
        ? c.req.header("origin") || ""
        : optsOrigin[0]
    }
  })
)

app.get("/list-episodes", async (c) => {
  const name = c.req.queries("name")

  if (!name) {
    return c.json(
      {
        message: 'Missing query "name"',
        code: "missing_query_name"
      },
      400
    )
  }
  const hash = name.join("|")

  const $animesOnCache = cache.get(hash) as
    | Awaited<ReturnType<typeof searchAnime>>
    | undefined
  const animes = $animesOnCache ?? (await searchAnime(name))

  if (!$animesOnCache) cache.set(hash, animes)

  if ((animes.length === 0) === undefined) {
    return c.json(
      {
        message: "Nothing found",
        code: "nothing_found"
      },
      404
    )
  }

  // TODO: default get first item
  const inKv = (await kv?.get(["anime", animes[0].id]))?.value
  if (inKv) {
    // update store
    // if (animes[0].progress.current === animes[0].progress.total) {
    //   void kv?.set(["anime", animes[0].id], inKv, {
    //     expireIn: 2592e6 /* 30 days */
    //   })
    // }

    return c.json(inKv)
  }

  const data = {
    list: (
      await Promise.all(animes.map((anime) => getListEpisodes(anime.id)))
    ).flat(1),
    ...animes[0]
  }
  void kv?.set(["anime", animes[0].id], data, {
    expireIn:
      animes[0].progress.current === animes[0].progress.total
        ? 2592e6 /* 30 days */
        : 432e5 /* 12 hours */
  })

  return c.json(data)
})

app.get("/episode-skip/:ep_id", async (c) => {
  const ep_id = c.req.param("ep_id")

  const inKv = (
    await kv?.get<Awaited<ReturnType<typeof getSource>>>([
      "episode skip",
      ep_id
    ])
  )?.value
  if (inKv && (!rangeEmpty(inKv.intro) || !rangeEmpty(inKv.outro))) {
    // void kv?.set(["episode skip", ep_id], inKv, {
    //   expireIn: 2592e6 /* 30 days */
    // })

    return c.json(inKv)
  }
  const servers = await getServersEpisode(ep_id)

  for (const server of servers) {
    try {
      const confServer = await getConfServer(server.id)

      const idRaw = confServer.link.replace(/^https?:\/\//i, "").split("/")[2]
      const serverId = idRaw.slice(0, idRaw.indexOf("?") >>> 0)

      const source = await getSource(serverId)

      if (
        !("intro" in source) ||
        !("outro" in source) ||
        (rangeEmpty(source.intro) && rangeEmpty(source.outro))
      )
        throw new Error("Nothing found 'intro' or 'outro'")

      void kv?.set(["episode skip", ep_id], source, {
        expireIn: 2592e6 /* 30 days */
      })

      return c.json(source)
    } catch (err) {
      console.warn(
        "[episode-skip]: load op/ep server %o failure. Change server (code: %o)",
        server,
        err
      )
    }
  }

  return c.json(
    {
      message: "Nothing found",
      code: "nothing_found"
    },
    404
  )
})

Deno.serve(app.fetch)
