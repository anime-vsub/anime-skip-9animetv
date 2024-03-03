import { search } from "./logic/search.ts"
import { getListEpisodes } from "./logic/get-list-episodes.ts"
import { getServersEpisode } from "./logic/get-servers-episode.ts"
import { getConfServer } from "./logic/get-conf-server.ts"
import { getSource } from "./logic/get-source.ts"

import { Hono } from "https://deno.land/x/hono@v4.0.8/mod.ts"
import { cors } from "https://deno.land/x/hono@v4.0.8/middleware.ts"

const app = new Hono()
const kv = await Deno.openKv?.()

app.use(
  "*",
  cors({
    origin: ["https://animevsub.eu.org", "https://animevsub.netlify.app", "http://localhost", "http://localhost:*"]
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

  const animes = await search(name)

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
  const { value: inKv } = await kv.get(["anime", animes[0].id])
  if (inKv) return c.json(inKv)

  const list = await getListEpisodes(animes[0].id)
  void kv?.set(["anime", animes[0].id], list, {
    expireIn:
      animes[0].progress.current === animes[0].progress.total
        ? 2592e6 /* 30 days */
        : 432e5 /* 12 hours */
  })

  return c.json(list)
})

app.get("/episode-skip/:ep_id", async (c) => {
  const ep_id = c.req.param("ep_id")

  const { value: inKv } = await kv?.get(["episode skip", ep_id])
  if (inKv) return c.json(inKv)

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
