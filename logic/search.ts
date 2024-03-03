import { parseDOM } from "./parse-dom.ts"

export async function search(keyword: string) {
  const $ = await fetch(
    `https://9animetv.to/search?keyword=${keyword.replace(/ /g, "+")}`
  )
    .then((res) => res.text())
    .then(parseDOM)

  return $(".flw-item")
    .toArray()
    .map((item) => {
      const $item = $(item)

      const poster = $item.find("img").attr("data-src")!

      const [current, total] = $item
        .find(".tick-item.tick-eps")
        .text()
        .trim()
        .replace(/^ep\s+?/i, "")
        .split("/")

      const progress = { current, total }
      const name = $item.find(".dynamic-name").text().trim()
      const jName = $item.find(".dynamic-name").attr("data-jname")?.trim()

      const id = $item.attr("data-id")!

      return { poster, progress, name, jName, id }
    })
}
