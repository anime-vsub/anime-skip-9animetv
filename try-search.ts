import MiniSearch from "npm:minisearch"

const miniSearch = new MiniSearch({
  fields: ["jName", "name"], // fields to index for full-text search
  storeFields: ["jName", "name", "poster", "progress", "id"] // fields to return with search results
})

miniSearch.addAll([
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/6c/14/6c146ac1b14091dc8e9e458ae175b940/6c146ac1b14091dc8e9e4",
    progress: { current: "1", total: "1" },
    name: "Ichigeki Sacchuu!! Hoihoi-san",
    jName: "Ichigeki Sacchuu!! Hoihoi-san",
    id: "7778"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/c1/33/c133b5d3ae580d33d8ef95296dffe1b7/c133b5d3ae580d33d8ef9",
    progress: { current: "1", total: "1" },
    name: "Dr. Stone: Stone Wars Eve of the Battle Special Feature",
    jName: "Dr. Stone: Stone Wars - Kaisen Zenya Special Eizou",
    id: "17236"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/61/d7/61d7f06300f4ca0d8db04cd3fb9524b7/61d7f06300f4ca0d8db04",
    progress: { current: "11", total: "11" },
    name: "Dr. Stone: Stone Wars",
    jName: "Dr. Stone: Stone Wars",
    id: "15691"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/2d/df/2ddf88c9249745b681a0c61711f4d240/2ddf88c9249745b681a0c",
    progress: { current: "24", total: "24" },
    name: "Dr. Stone",
    jName: "Dr. Stone",
    id: "175"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/39/84/39842779db6898d628ab8fe3d1016400/39842779db6898d628ab8",
    progress: { current: "27", total: "27" },
    name: "Dr. Dokkiri",
    jName: "Dokkiri Doctor",
    id: "5680"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/7b/fa/7bfa12392a67232a8ee52f2fc7405f67/7bfa12392a67232a8ee52",
    progress: { current: "153", total: "243" },
    name: "Dr. Slump: Arale-chan",
    jName: "Dr. Slump: Arale-chan",
    id: "17973"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/34/08/3408c152b71f0f3355e69abbbf8e662e/3408c152b71f0f3355e69",
    progress: { current: "Full", total: undefined },     
    name: "Dr. Slump and Arale-chan Movie 11: Dr. Mashirito and Abale-chan",
    jName: "Dr. Slump Movie 11: Dr. Mashirito & Abale-chan",
    id: "7879"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/2b/d8/2bd8e88f0828f5c69560f6cbd82317e7/2bd8e88f0828f5c69560f",
    progress: { current: "243", total: "243" },
    name: "Dr. Slump: Arale-chan [RAW]",
    jName: "Dr. Slump: Arale-chan [RAW]",
    id: "2906"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/ad/99/ad996e7a1f5391a68b19f80a479fc43c/ad996e7a1f5391a68b19f",
    progress: { current: "1", total: "1" },
    name: "Dr. Stone: Ryuusui",
    jName: "Dr. Stone: Ryuusui",
    id: "18114"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/7e/c4/7ec4a72790fad8a375f2d21aa52fa1c7/7ec4a72790fad8a375f2d",
    progress: { current: "74", total: "74" },
    name: "Dr. Slump",
    jName: "Dr. Slump",
    id: "3560"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/ed/ec/edeccbecda5ce56f6b10e5fba341e940/edeccbecda5ce56f6b10e",
    progress: { current: "Full", total: undefined },     
    name: "Dr. Slump and Arale-chan Movie 10: Arale's Surprise",
    jName: "Dr. Slump Movie 10: Arale no Bikkuriman",    
    id: "7769"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/53/3d/533d9ca61bd99ff5c4c5f6d754feb33d/533d9ca61bd99ff5c4c5f",
    progress: { current: "11", total: "11" },
    name: "Dr. Stone 3rd Season Part 2",
    jName: "Dr. Stone: New World Part 2",
    id: "18574"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/0c/ab/0cab1ee2bbe1a4def0790121df2c1fc7/0cab1ee2bbe1a4def0790",
    progress: { current: "11", total: "11" },
    name: "Dr. Stone: New World",
    jName: "Dr. Stone 3rd Season",
    id: "17725"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/cf/19/cf19646f9576b1b8ba5e4ab1e8275236/cf19646f9576b1b8ba5e4",
    progress: { current: "2", total: "2" },
    name: "Dr. Slump: Arale-chan Specials",
    jName: "Dr. Slump: Arale-chan Specials",
    id: "8006"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/ef/e2/efe2c6da5dc68d1b5cb41bb7686afd87/efe2c6da5dc68d1b5cb41",
    progress: { current: "Full", total: undefined },     
    name: "Dr. Slump and Arale-chan Movie 04: Hoyoyo! The Treasure of Nanaba Castle",
    jName: "Dr. Slump Movie 04: Arale-chan Hoyoyo! Nanaba Shiro no Hihou",
    id: "6331"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/58/c5/58c53e22833be8359ecf6f5f5843c881/58c53e22833be8359ecf6",
    progress: { current: "Full", total: undefined },     
    name: "Dr. Slump and Arale-chan Movie 03: Hoyoyo, Great Round-the-World Race",
    jName: "Dr. Slump Movie 03: Arale-chan Hoyoyo! Sekai Isshuu Dai Race",
    id: "6987"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/ed/2d/ed2de7fd39f9cdde3178ce5e4b0278db/ed2de7fd39f9cdde3178c",
    progress: { current: "Full", total: undefined },     
    name: "Dr. Slump and Arale-chan Movie 01: Hello! Wonder Island",
    jName: "Dr. Slump Movie 01: Arale-chan Hello! Fushigi Shima",
    id: "6431"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/44/1f/441f4577f433d5a989d79012811b44c6/441f4577f433d5a989d79",
    progress: { current: "Full", total: undefined },     
    name: "Dr. Slump and Arale-chan Movie 09: N-cha!! Excited Heart of Summer Vacation",
    jName: "Dr. Slump Movie 09: Arale-chan N-cha!! Wakuwaku Hot no Natsuyasumi",
    id: "7150"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/b8/02/b80227b0e6580369720a58566cec5811/b80227b0e6580369720a5",
    progress: { current: "12", total: "12" },
    name: "Dr. Ramune -Mysterious Disease Specialist-",  
    jName: "Kai Byoui Ramune",
    id: "15752"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/df/8a/df8a462177304e4fcfe8f66832094930/df8a462177304e4fcfe8f",
    progress: { current: "Full", total: undefined },     
    name: "Dr. Slump and Arale-chan Movie 05: Hoyoyo! City of Dreams, Mechapolis",
    jName: "Dr. Slump Movie 05: Arale-chan Hoyoyo! Yume no Miyako Mechapolis",
    id: "7600"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/af/88/af882c757e36fb2da0399c9153d681b2/af882c757e36fb2da0399",
    progress: { current: "Full", total: undefined },     
    name: "Dr. Slump and Arale-chan Movie 06: N-cha! Clear Skies Over Penguin Village",
    jName: "Dr. Slump Movie 06: Arale-chan N-cha! Penguin Mura wa Hare Nochi Hare",
    id: "7149"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/2c/f4/2cf4f8be8aaf9ba0ec70fbf7e5c70985/2cf4f8be8aaf9ba0ec70f",
    progress: { current: "Full", total: undefined },     
    name: 'Dr. Slump and Arale-chan Movie 02: "Hoyoyo!" Space Adventure',
    jName: 'Dr. Slump Movie 02: "Hoyoyo!" Uchuu Daibouken',
    id: "5946"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/ba/94/ba9491d2165a990c009a185dac97742a/ba9491d2165a990c009a1",
    progress: { current: "Full", total: undefined },     
    name: "Dr. Slump and Arale-chan Movie 07: N-cha! From Penguin Village with Love",
    jName: "Dr. Slump Movie 07: Arale-chan N-cha! Penguin Mura yori Ai wo Komete",
    id: "7321"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/8d/42/8d42031c8f566e744d84de02d42466bc/8d42031c8f566e744d84d",
    progress: { current: "Full", total: undefined },     
    name: "The Last: Naruto the Movie",
    jName: "The Last: Naruto the Movie",
    id: "882"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/06/c5/06c5daf10f82925b4b2f6aecc086d194/06c5daf10f82925b4b2f6",
    progress: { current: "26", total: "26" },
    name: "The Big O",
    jName: "The Big O",
    id: "1487"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/7b/4b/7b4be2151cbb0fc0298c35c5227a5e41/7b4be2151cbb0fc0298c3",
    progress: { current: "Full", total: undefined },     
    name: "Dr. Slump and Arale-chan Movie 08: Hoyoyo!! Follow the Rescued Shark...",
    jName: "Dr. Slump Movie 08: Arale-chan Hoyoyo!! Tasuketa Same ni Tsurerarete...",
    id: "7628"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/15/6d/156d675b246379abe808817bee3a2f5b/156d675b246379abe8088",
    progress: { current: "12", total: "12" },
    name: "The Marginal Service",
    jName: "The Marginal Service",
    id: "18367"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/17/5b/175b13ee05f6e1366a9866baa5100905/175b13ee05f6e1366a986",
    progress: { current: "8", total: "8" },
    name: "The Missing 8",
    jName: "The Missing 8",
    id: "18146"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/a5/c4/a5c4a55da70abc25520803b656f2c679/a5c4a55da70abc2552080",
    progress: { current: "Full", total: undefined },     
    name: "Aria the Benedizione",
    jName: "Aria the Benedizione",
    id: "17684"
  },
  {
    poster: "https://img.bunnyccdn.co/_r/300x400/100/c7/58/c7580bc6ce08c6209d9936944cb45824/c7580bc6ce08c6209d993",
    progress: { current: "13", total: "13" },
    name: "Vazzrock The Animation",
    jName: "Vazzrock The Animation",
    id: "17288"
  }
])

// console.log(index.search("Cổng chiến tranh GATE, Gate: Thus the JSDF Fought There!, Gate: Jieitai Kanochi nite, Kaku Tatakaeri"))

console.log(
  miniSearch.search(
    "Dr. Stone",
    {combineWith: 'AND',
      boost: { jName: 1.4 },
      // fuzzy: 0.2
    }
  )
)
