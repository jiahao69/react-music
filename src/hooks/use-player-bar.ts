import { useEffect } from "react"

import { useHomeStore } from "@/store/modules"
import { useAudio } from "@/hooks/player/use-audio"
import { useProgress } from "@/hooks/player/use-progress"
import { usePlayerControl } from "@/hooks/player/use-play-control"
import { useVolume } from "@/hooks/player/use-volume"

export function usePlayerBar() {
  const playIndex = useHomeStore((state) => state.playIndex)
  const playlist = useHomeStore((state) => state.playlist)

  const currentPlay = playlist[playIndex]

  const { audioRef, playStatus, play, onPlayStatusChange } = useAudio()

  // 进度控制
  const {
    currentTime,
    playProgress,
    onTimeUpdate,
    onProgressChanging,
    onProgressChanged
  } = useProgress(currentPlay, audioRef)

  // 处理播放器功能
  const { playMode, switchSongs, onPlayModeChange, onPlayEnded } =
    usePlayerControl(audioRef)

  // 音量控制
  const {
    volumeProgress,
    onVolumeProgressChanging,
    onVolumeProgressChanged,
    onMutedChange
  } = useVolume(audioRef)

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
