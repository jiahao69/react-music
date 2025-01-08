import { create } from "zustand"

export interface IPlaylist {
  id: number
  picUrl: string
  name: string
  artist: string
  duration: number
  playDuration: number
  playUrl: string
}

type State = {
  playIndex: number
  playStatus: boolean
  playlist: IPlaylist[]
}

type Actions = {
  setPlayIndex: (index: number) => void
  setPlaylist: (song: IPlaylist) => void
}

export const useHomeStore = create<State & Actions>((set) => ({
  // 当前播放索引
  playIndex: 0,
  // 播放状态
  playStatus: false,
  // 播放列表
  playlist: [],

  setPlayIndex: (index: number) => {
    set(() => ({ playIndex: index }))
  },

  // 设置播放列表
  setPlaylist: (song: IPlaylist) =>
    set((state) => ({
      playlist: [song, ...state.playlist]
    }))
}))
