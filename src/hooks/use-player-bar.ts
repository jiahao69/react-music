import { useRef, useEffect } from "react"

import { useHomeStore } from "@/store/modules"
import { useProgress } from "@/hooks/player/use-progress"
import { usePlayerControl } from "@/hooks/player/use-player-control"
import { useVolume } from "@/hooks/player/use-volume"

export function usePlayerBar() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const playIndex = useHomeStore((state) => state.playIndex)
  const playlist = useHomeStore((state) => state.playlist)

  const currentPlay = playlist[playIndex]

  // 处理播放进度
  const {
    currentTime,
    playProgress,
    onTimeUpdate,
    onProgressChanging,
    onProgressChanged
  } = useProgress(currentPlay, audioRef)

  // 处理播放器基本功能(播放暂停 切换歌曲 切换模式)
  const {
    playMode,
    playStatus,
    onPlayStatusChange,
    play,
    switchSongs,
    onPlayModeChange,
    onPlayEnded
  } = usePlayerControl(audioRef)

  // 处理音量调节
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
    playlist,
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
