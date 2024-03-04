import { search } from "./logic/search.ts"
import { getListEpisodes } from "./logic/get-list-episodes.ts"
import { getServersEpisode } from "./logic/get-servers-episode.ts"
import { getConfServer } from "./logic/get-conf-server.ts"
import { getSource } from "./logic/get-source.ts"

import MiniSearch from "npm:minisearch"

import { Hono } from "https://deno.land/x/hono@v4.0.8/mod.ts"
import { cors } from "https://deno.land/x/hono@v4.0.8/middleware.ts"
import { Cache } from "https://deno.land/x/ttl_cache@v0.1.1/mod.ts"

const app = new Hono()
const kv = await Deno.openKv?.()
const cache = new Cache<string, unknown>(30 * 60 * 1000) // 30 minutes

app.use(
  "*",
  cors({
    origin: [
      "https://animevsub.eu.org",
      "https://animevsub.netlify.app",
      "http://localhost:9000",
      "http://localhost:9200"
    ]
  })
)

app.get("/list-episodes", async (c) => {
  const name = c.req.query("name")

  if (!name) {
    return c.json(
      {
        message: 'Missing query "name"',
        code: "missing_query_name"
      },
      400
    )
  }

  const animes = cache.has(name)
    ? (cache.get(name) as Awaited<ReturnType<typeof search>>)
    : await search(name).then((animes) => {
        const miniSearch = new MiniSearch({
          fields: ["jName", "name"], // fields to index for full-text search
          storeFields: ["jName", "name", "poster", "progress", "id"] // fields to return with search results
        })

        miniSearch.addAll(animes)

        return miniSearch.search(name, {
          boost: { jName: 3 },
          fuzzy: 0.2
        })
      })

  if (!cache.has(name)) cache.set(name, animes)

  console.log(animes)

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
    if (animes[0].progress.current === animes[0].progress.total) {
      void kv?.set(["anime", animes[0].id], inKv, {
        expireIn: 2592e6 /* 30 days */
      })
    }

    return c.json(inKv)
  }

  const data = {
    list: await getListEpisodes(animes[0].id),
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

  const inKv = (await kv?.get(["episode skip", ep_id]))?.value
  if (inKv) {
    void kv?.set(["episode skip", ep_id], inKv, {
      expireIn: 2592e6 /* 30 days */
    })

    return c.json(inKv)
  }
  const servers = await getServersEpisode(ep_id)

  for (const server of servers) {
    try {
      const confServer = await getConfServer(server.id)

      const idRaw = confServer.link.replace(/^https?:\/\//i, "").split("/")[2]
      const serverId = idRaw.slice(0, idRaw.indexOf("?") >>> 0)

      const source = await getSource(serverId)

      if (!("intro" in source) || !("outro" in source))
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
