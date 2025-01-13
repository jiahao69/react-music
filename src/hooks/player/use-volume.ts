import { useState, useEffect, useRef, useCallback } from "react"

export function useVolume(audioRef: React.RefObject<HTMLAudioElement>) {
  const [volumeProgress, setVolumeProgress] = useState(100)
  const tempVolumeProgress = useRef(100)

  useEffect(() => {
    if (!audioRef.current) return

    // 设置默认音量
    audioRef.current.volume = 1
  }, [])

  // 音量拖动中
  const onVolumeProgressChanging = useCallback((progress: number) => {
    setVolumeProgress(progress)
  }, [])

  // 音量拖动结束
  const onVolumeProgressChanged = useCallback((progress: number) => {
    if (!audioRef.current) return

    tempVolumeProgress.current = progress

    audioRef.current.volume = progress / 100
  }, [])

  const onMutedChange = useCallback(() => {
    if (!audioRef.current) return

    !audioRef.current.muted
      ? setVolumeProgress(0)
      : setVolumeProgress(tempVolumeProgress.current)

    audioRef.current.muted = !audioRef.current.muted
  }, [])

  return {
    volumeProgress,
    onVolumeProgressChanging,
    onVolumeProgressChanged,
    onMutedChange
  }
}
