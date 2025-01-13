import { useRef, useState, useCallback, type RefObject } from "react"
import { IPlaylist } from "@/store/modules"

export function useProgress(
  currentPlay: IPlaylist,
  audioRef: RefObject<HTMLAudioElement>
) {
  const isDragRef = useRef(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [playProgress, setPlayProgress] = useState(0)

  // 随着歌曲播放触发
  const onTimeUpdate = useCallback(() => {
    // 在拖动中不设置时间和进度
    if (!audioRef.current || isDragRef.current) return

    const time = audioRef.current.currentTime * 1000
    const progress = (time / currentPlay.playDuration) * 100

    setCurrentTime(time)
    setPlayProgress(progress)
  }, [currentPlay.playDuration])

  // 播放进度拖动中
  const onProgressChanging = useCallback(
    (progress: number) => {
      isDragRef.current = true

      const time = currentPlay.playDuration * (progress / 100)

      setCurrentTime(time)
      setPlayProgress(progress)
    },
    [currentPlay.playDuration]
  )

  // 播放进度拖动结束
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

  return {
    currentTime,
    playProgress,
    onTimeUpdate,
    onProgressChanging,
    onProgressChanged
  }
}
