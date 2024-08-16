import { load } from "cheerio"
import { parseDocument } from "htmlparser2"

export function parseDOM(html: string) {
  return load(parseDocument(html))
}
