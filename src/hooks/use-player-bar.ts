import { useEffect, useCallback } from "react"

import { useHomeStore } from "@/store/modules"
import { useAudio } from "@/hooks/player/use-audio"
import { useProgress } from "@/hooks/player/use-progress"
import { usePlayControl } from "@/hooks/player/use-play-control"
import { useVolume } from "@/hooks/player/use-volume"

export function usePlayerBar() {
  const playIndex = useHomeStore((state) => state.playIndex)
  const playlist = useHomeStore((state) => state.playlist)

  const currentPlay = playlist[playIndex]

  const { audioRef, playStatus, play, onPlayStatusChange } = useAudio()

  const {
    currentTime,
    playProgress,
    onTimeUpdate,
    onProgressChanging,
    onProgressChanged
  } = useProgress(currentPlay, audioRef)

  const { playMode, switchSongs, onPlayModeChange } = usePlayControl(audioRef)

  const {
    volumeProgress,
    onVolumeProgressChanging,
    onVolumeProgressChanged,
    onMutedChange
  } = useVolume(audioRef)

  // 歌曲播放结束时触发
  const onPlayEnded = useCallback(() => switchSongs(true), [switchSongs])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("play", onPlayStatusChange)
    audio.addEventListener("pause", onPlayStatusChange)
    audio.addEventListener("ended", onPlayEnded)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("play", onPlayStatusChange)
      audio.removeEventListener("pause", onPlayStatusChange)
      audio.removeEventListener("ended", onPlayEnded)
    }
  }, [onTimeUpdate, onPlayEnded])

  return {
    currentPlay,
    audioRef,
    currentTime,
    playStatus,
    playProgress,
    playMode,
    volumeProgress,
    play,
    switchSongs,
    onProgressChanging,
    onProgressChanged,
    onVolumeProgressChanging,
    onVolumeProgressChanged,
    onMutedChange,
    onPlayModeChange
  }
}
