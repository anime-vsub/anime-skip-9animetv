import { parseDOM } from "./parse-dom.ts"

export function load$(url: string) {
  return fetch(url)
    .then((res) => res.json())
    .then(({ html }) => html)
    .then(parseDOM)
}
