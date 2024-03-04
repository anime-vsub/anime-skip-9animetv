# anime-skip-9animetv
API supports retrieving anime `intro`, `outro` information from `9animetv`

## Usage
### `/list-episodes?name=<string>`
Get the episode list and some related information from the anime name
```typescript
interface ListEpisodes {
  poster: string
  progress: {
    current: string
    total: string
  }
  name: string
  jName?: string
  id: string
  list: {
    id: string
    order: string
    name: string
    title?: string
  }[]
}
```

### `/episode-skip/<id>`
Get the `name`, `intro` and `outro` information of the anime episode. `id` is the episode id taken from the [`/list-episodes?name=<string>`](#list-episodesnamestring) api
```typescript
interface InOutroEpisode {
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
}
```
