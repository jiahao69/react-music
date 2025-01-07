import { create } from "zustand"

interface IPlaylists {
  id: number
  picUrl: string
  name: string
  singer: string
  duration: number
}

type State = {
  playIndex: number
  playlists: IPlaylists[]
}

type Actions = {
  setPlaylists: (song: IPlaylists) => void
}

export const useHomeStore = create<State & Actions>((set) => ({
  // 当前播放索引
  playIndex: 0,
  // 播放列表
  playlists: [],

  // 设置播放列表
  setPlaylists: (song: IPlaylists) =>
    set((state) => ({
      playlists: [song, ...state.playlists]
    }))
}))
