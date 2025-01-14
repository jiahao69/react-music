import { create } from "zustand"

import { playModeEnum } from "@/constant/enum"

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
  playMode: number
  playlist: IPlaylist[]
}

type Actions = {
  setPlayIndex: (index: number) => void
  setPlayStatus: (status: boolean) => void
  setPlayMode: (mode: number) => void
  setPlaylist: (list: IPlaylist[]) => void
}

export const useHomeStore = create<State & Actions>((set) => ({
  // 当前播放索引
  playIndex: 0,
  // 播放状态
  playStatus: false,
  // 播放模式(默认顺序播放)
  playMode: playModeEnum.order,
  // 播放列表
  playlist: [],

  setPlayIndex: (index: number) => set(() => ({ playIndex: index })),

  setPlayStatus: (status: boolean) => set(() => ({ playStatus: status })),

  setPlayMode: (mode: number) => set(() => ({ playMode: mode })),

  // 设置播放列表
  setPlaylist: (list: IPlaylist[]) =>
    set((state) => ({
      playlist: [...list, ...state.playlist]
    }))
}))
