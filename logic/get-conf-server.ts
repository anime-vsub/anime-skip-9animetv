export function getConfServer(server_id: string): Promise<{
  type: "iframe"
  link: string
}> {
  return fetch(`https://9animetv.to/ajax/episode/sources?id=${server_id}`).then(
    (res) => res.json()
  )
}

