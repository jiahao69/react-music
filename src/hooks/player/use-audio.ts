import { useRef, useCallback } from "react"

import { useHomeStore } from "@/store/modules"

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playStatus = useHomeStore((state) => state.playStatus)

  const setPlayStatus = useHomeStore((state) => state.setPlayStatus)

  // UI同步播放状态
  const onPlayStatusChange = useCallback(
    () => setPlayStatus(!audioRef.current?.paused),
    []
  )

  const play = useCallback(() => {
    const audio = audioRef.current

    playStatus ? audio?.pause() : audio?.play()
  }, [playStatus])

  return {
    audioRef,
    playStatus,
    onPlayStatusChange,
    play
  }
}
