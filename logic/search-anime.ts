import MiniSearch from "npm:minisearch"
import stringRemovePunctuation from "npm:@stdlib/string-remove-punctuation"

import vnStr from "npm:vn-str"
import { search } from "./search.ts"

export async function searchAnime(name: string[]) {
  const mainName =
    vnStr.isVietnameseTones(name[0]) && name.length === 2
      ? stringRemovePunctuation(name[1]).toLowerCase()
      : stringRemovePunctuation(name[0]).toLowerCase()

  const tKeyword = name
    .filter((item) => !vnStr.isVietnameseTones(item))
    .join(", ")

  const animes = await search(tKeyword)

  const extract = animes.find(
    (anime) =>
      stringRemovePunctuation(anime.name).toLowerCase() === mainName ||
      (anime.jName &&
        stringRemovePunctuation(anime.jName).toLowerCase() === mainName)
  )

  if (extract) return [extract]

  const miniSearch = new MiniSearch({
    fields: ["jName", "name"], // fields to index for full-text search
    storeFields: ["jName", "name", "poster", "progress", "id"] // fields to return with search results
  })

  miniSearch.addAll(animes)

  const resultSearch = miniSearch.search(tKeyword, {
    boost: { jName: 1.4 },
    fuzzy: 0.2
  })

  const first = resultSearch[0]

  const part2 = animes.find((item) => {
    const iName = stringRemovePunctuation(item.name).toLowerCase()
    return (
      iName === first.name + " part 2" ||
      iName === first.jName + " part 2" ||
      iName === first.name + " part ii" ||
      iName === first.jName + " part ii"
    )
  })

  return part2 ? [first, part2] : [first]
}
