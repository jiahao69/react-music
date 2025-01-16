import { useCallback, type RefObject } from "react"

import { useHomeStore } from "@/store/modules"
import { playModeEnum } from "@/constant/enum"

export function usePlayerControl(audioRef: RefObject<HTMLAudioElement>) {
  const playIndex = useHomeStore((state) => state.playIndex)
  const playMode = useHomeStore((state) => state.playMode)
  const playlist = useHomeStore((state) => state.playlist)

  const setPlayIndex = useHomeStore((state) => state.setPlayIndex)
  const setPlayMode = useHomeStore((state) => state.setPlayMode)

  // 上一首
  const prev = useCallback(() => {
    // 当前是第一首歌时播放最后一首
    const index = playIndex === 0 ? playlist.length - 1 : playIndex - 1

    setPlayIndex(index)
  }, [playIndex, playlist.length])

  // 下一首
  const next = useCallback(() => {
    // 当前是最后一首歌时播放第一首歌
    const index = playIndex === playlist.length - 1 ? 0 : playIndex + 1

    setPlayIndex(index)
  }, [playIndex, playlist.length])

  // 切换歌曲(上一首或下一首)
  const switchSongs = useCallback(
    (isNext: boolean) => {
      switch (playMode) {
        // 顺序播放
        case playModeEnum.order:
          isNext ? next() : prev()

          break
        // 单曲循环
        case playModeEnum.loop:
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
          }

          break
        // 随机播放
        case playModeEnum.random:
          // 根据播放列表数量生成一个随机数
          const randomNum = (Math.random() * playlist.length) | 0

          setPlayIndex(randomNum)

          break
      }
    },
    [playMode, playlist, prev, next]
  )

  // 切换播放模式
  const onPlayModeChange = useCallback(() => {
    const mode = (playMode + 1) % 3

    setPlayMode(mode)
  }, [playMode])

  // 歌曲播放结束触发(切换下一首歌曲)
  const onPlayEnded = useCallback(() => switchSongs(true), [switchSongs])

  return {
    playMode,
    switchSongs,
    onPlayModeChange,
    onPlayEnded
  }
}
