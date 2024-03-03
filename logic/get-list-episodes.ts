import { load$ } from "./load-$.ts"

export async function getListEpisodes(anime_id: string) {
  const $ = await load$(`https://9animetv.to/ajax/episode/list/${anime_id}`)

  return $("a.ep-item")
    .toArray()
    .map((anchor) => {
      const $a = $(anchor)

      const id = $a.attr("data-id")
      const order = $a.attr("data-number")
      const name = $a.text().trim()
      const title = $a.attr("title")

      if (id === undefined || order === undefined) return null

      return { id, order, name, title }
    })
    .filter(Boolean)
}
