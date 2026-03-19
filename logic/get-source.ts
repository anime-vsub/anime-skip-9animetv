export function getSource(server_id: string): Promise<{
  sources: string
  tracks: {
    file: string
    label: string
    kind: "captions"
    default?: true
  }[]
  encrypted: boolean
  intro: {
    start: number
    end: number
  }
  outro: {
    start: number
    end: number
  }
  server: number
}> {
  return fetch(
    `https://rapid-cloud.co/embed-2/v2/e-1/getSources?id=${server_id}`
  ).then((res) => res.json())
}
