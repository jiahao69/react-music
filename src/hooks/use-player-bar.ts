import { useRef, useState, useEffect, useCallback } from "react"

import { useHomeStore } from "@/store/modules"

export function usePlayerBar() {
  const playlist = useHomeStore((state) => state.playlist)
  const playIndex = useHomeStore((state) => state.playIndex)

  const setPlayIndex = useHomeStore((state) => state.setPlayIndex)

  const audioRef = useRef<HTMLAudioElement>(null)
  const isDragRef = useRef(false)

  const [playStatus, setPlayStatus] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [playProgress, setPlayProgress] = useState(0)

  const currentPlay = playlist[playIndex]

  // 同步播放时间与进度
  const onTimeUpdate = useCallback(() => {
    // 在拖动中不设置时间和进度
    if (!audioRef.current || isDragRef.current) return

    const time = audioRef.current.currentTime * 1000
    const progress = (time / currentPlay.playDuration) * 100

    setCurrentTime(time)
    setPlayProgress(progress)
  }, [currentPlay.playDuration])

  // 同步播放状态
  const onPlayStatusChange = useCallback(() => {
    if (!audioRef.current) return

    setPlayStatus(!audioRef.current.paused)
  }, [])

  useEffect(() => {
    if (!audioRef.current) return

    // 设置默认音量
    audioRef.current.volume = 0.5
  }, [])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("play", onPlayStatusChange)
    audio.addEventListener("pause", onPlayStatusChange)
    audio.addEventListener("ended", onPlayStatusChange)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("play", onPlayStatusChange)
      audio.removeEventListener("pause", onPlayStatusChange)
      audio.removeEventListener("ended", onPlayStatusChange)
    }
  }, [onTimeUpdate, onPlayStatusChange])

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

  // 静音切换
  const onVolumeClick = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
    }
  }

  // 播放控制
  const play = useCallback(() => {
    playStatus ? audioRef.current?.pause() : audioRef.current?.play()
  }, [playStatus])

  // 上一首
  const prev = useCallback(() => {
    const index = Math.max(0, playIndex - 1)

    setPlayIndex(index)
  }, [playIndex, setPlayIndex])

  // 下一首
  const next = useCallback(() => {
    const index = Math.min(playlist.length - 1, playIndex + 1)

    setPlayIndex(index)
  }, [playIndex, setPlayIndex])

  return {
    currentPlay,
    audioRef,
    currentTime,
    playStatus,
    playProgress,
    play,
    prev,
    next,
    onProgressChanging,
    onProgressChanged,
    onVolumeProgressChanged,
    onVolumeClick
  }
}
