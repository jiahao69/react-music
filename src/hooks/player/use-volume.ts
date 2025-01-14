import { useState, useEffect, useRef, useCallback, type RefObject } from "react"

// 默认音量
const defaultVolume = 0.5

export function useVolume(audioRef: RefObject<HTMLAudioElement>) {
  const [volumeProgress, setVolumeProgress] = useState(defaultVolume * 100)
  const tempVolumeProgress = useRef(defaultVolume * 100)

  useEffect(() => {
    if (!audioRef.current) return

    // 设置默认音量
    audioRef.current.volume = defaultVolume
  }, [])

  // 音量拖动中
  const onVolumeProgressChanging = useCallback((progress: number) => {
    setVolumeProgress(progress)
  }, [])

  // 音量拖动结束
  const onVolumeProgressChanged = useCallback((progress: number) => {
    if (!audioRef.current) return

    // 临时记录音量进度
    tempVolumeProgress.current = progress

    // 设置音量
    audioRef.current.volume = progress / 100
  }, [])

  // 切换静音
  const onMutedChange = useCallback(() => {
    if (!audioRef.current) return

    if (audioRef.current.volume) {
      setVolumeProgress(0)
      audioRef.current.volume = 0
    } else {
      const volumeProgress = tempVolumeProgress.current || defaultVolume * 100

      setVolumeProgress(volumeProgress)
      audioRef.current.volume = volumeProgress / 100
    }
  }, [])

  return {
    volumeProgress,
    onVolumeProgressChanging,
    onVolumeProgressChanged,
    onMutedChange
  }
}
