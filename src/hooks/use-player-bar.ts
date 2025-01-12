import { useRef, useState, useEffect, useCallback } from "react"

import { useHomeStore } from "@/store/modules"
import { playModeEnum } from "@/constant/enum"

export function usePlayerBar() {
  const playlist = useHomeStore((state) => state.playlist)
  const playIndex = useHomeStore((state) => state.playIndex)

  const setPlayIndex = useHomeStore((state) => state.setPlayIndex)

  const audioRef = useRef<HTMLAudioElement>(null)
  const isDragRef = useRef(false)

  const [playStatus, setPlayStatus] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [playProgress, setPlayProgress] = useState(0)
  const [playMode, setPlayMode] = useState(playModeEnum.order)

  const currentPlay = playlist[playIndex]

  // 同步播放时间与进度
  const onTimeUpdate = useCallback(() => {
    // 在拖动中不设置时间和进度
    if (!audioRef.current || isDragRef.current) return

    const time = audioRef.current.currentTime * 1000
    const progress = (time / currentPlay.playDuration) * 100

    setCurrentTime(time)
    setPlayProgress(progress)
  }, [currentPlay])

  // 歌曲播放结束时触发
  const onPlayEnded = useCallback(() => {
    switch (playMode) {
      // 顺序播放
      case playModeEnum.order:
        // 播放下一首
        next()

        break
      case playModeEnum.loop:
        // 单曲循环
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play()
        }

        break
      case playModeEnum.random:
        break
      default:
        break
    }
  }, [playMode, playIndex, playlist])

  useEffect(() => {
    if (!audioRef.current) return

    // 设置默认音量
    audioRef.current.volume = 0.5
  }, [])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("ended", onPlayEnded)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("ended", onPlayEnded)
    }
  }, [onTimeUpdate, playMode])

  // 进度拖动中
  const onProgressChanging = useCallback(
    (progress: number) => {
      isDragRef.current = true

      const time = currentPlay.playDuration * (progress / 100)

      setCurrentTime(time)
      setPlayProgress(progress)
    },
    [currentPlay.playDuration]
  )

  // 进度拖动结束
  const onProgressChanged = useCallback(
    (progress: number) => {
      isDragRef.current = false

      const time = currentPlay.playDuration * (progress / 100)

      // 更新当前歌曲播放进度
      if (audioRef.current) {
        audioRef.current.currentTime = time / 1000
        audioRef.current.play()
      }
    },
    [currentPlay.playDuration]
  )

  // 音量拖动结束
  const onVolumeProgressChanged = (progress: number) => {
    if (!audioRef.current) return

    audioRef.current.volume = progress / 100
  }

  const onVolumeClick = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
    }
  }

  // 播放控制
  const play = useCallback(() => {
    const audio = audioRef.current

    // 当前播放状态
    const status = !audio?.paused

    status ? audio?.pause() : audio?.play()

    setPlayStatus(!status)
  }, [playStatus])

  // 上一首
  const prev = useCallback(() => {
    // 当前是第一首歌时播放最后一首
    const index = playIndex === 0 ? playlist.length - 1 : playIndex - 1

    setPlayIndex(index)
  }, [playIndex, playlist])

  // 下一首
  const next = useCallback(() => {
    // 当前是最后一首歌时播放第一首歌
    const index = playIndex === playlist.length - 1 ? 0 : playIndex + 1

    setPlayIndex(index)
  }, [playIndex, playlist])

  // 播放模式切换
  const onPlayModeChange = () => {
    setPlayMode((playMode + 1) % 3)
  }

  return {
    currentPlay,
    audioRef,
    currentTime,
    playStatus,
    playProgress,
    playMode,
    play,
    prev,
    next,
    onProgressChanging,
    onProgressChanged,
    onVolumeProgressChanged,
    onVolumeClick,
    onPlayModeChange
  }
}
