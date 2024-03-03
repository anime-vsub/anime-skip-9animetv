import { load } from "npm:cheerio"
import { parseDocument } from "npm:htmlparser2"

export function parseDOM(html: string) {
  return load(parseDocument(html))
}
