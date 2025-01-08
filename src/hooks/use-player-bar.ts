import { useEffect, useRef, useState } from "react"

import { useHomeStore } from "@/store/modules"

let isControlProgress = false

export function usePlayerBar() {
  const playlist = useHomeStore((state) => state.playlist)
  const playIndex = useHomeStore((state) => state.playIndex)
  const setPlayIndex = useHomeStore((state) => state.setPlayIndex)

  const audioRef = useRef<HTMLAudioElement>(null)

  const [playStatus, setPlayStatus] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [playProgress, setPlayProgress] = useState(0)

  const currentPlay = playlist[playIndex]

  useEffect(() => {
    // 播放进度改变时触发
    audioRef.current?.addEventListener("timeupdate", () => {
      const time = Math.floor(audioRef.current?.currentTime!) * 1000
      const progress = (time / currentPlay.playDuration) * 100

      // 在没有进度条时设置显示的时间和进度
      if (!isControlProgress) {
        setCurrentTime(time)
        setPlayProgress(progress)
      }
    })

    // 更新播放状态
    ;["play", "pause", "ended"].map((item) =>
      audioRef.current?.addEventListener(item, () =>
        setPlayStatus(!audioRef.current?.paused)
      )
    )
  }, [])

  // 手动拖动进度条时触发
  const onProgressChange = (progress: number) => {
    isControlProgress = true

    const time = currentPlay.playDuration * (progress / 100)

    setCurrentTime(time)
    setPlayProgress(progress)
  }

  //手动拖动进度条结束时触发
  const onProgressCompleteChange = (progress: number) => {
    isControlProgress = false

    const time = currentPlay.playDuration * (progress / 100)

    // 更新当前歌曲播放进度
    if (audioRef.current) {
      audioRef.current.currentTime = time / 1000
      audioRef.current.play()
    }
  }

  // 播放暂停
  const play = () => {
    playStatus ? audioRef.current?.pause() : audioRef.current?.play()
  }

  // 上一首
  const prev = () => {
    const index = Math.max(0, playIndex - 1)

    setPlayIndex(index)
  }

  // 下一首
  const next = () => {
    const index = Math.min(playlist.length - 1, playIndex + 1)

    setPlayIndex(index)
  }

  return {
    currentPlay,
    audioRef,
    currentTime,
    playStatus,
    playProgress,
    play,
    prev,
    next,
    onProgressChange,
    onProgressCompleteChange
  }
}
