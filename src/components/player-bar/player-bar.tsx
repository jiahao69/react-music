import { memo, useMemo, useState } from "react"
import type { FC, ReactNode } from "react"
import { Slider, Image } from "antd"

import { playModeEnum } from "@/constant/enum"

import {
  BarMotionWrapper,
  BarLeftLayout,
  BarMiddleLayout,
  BarRightLayout
} from "./player-bar-style"
import { formatDuration } from "@/utils/format-duration"
import { usePlayerBar } from "@/hooks/use-player-bar"
import { getImg } from "@/utils/files"

import PlaylistPopup from "@/components/playlist-popup/playlist-popup"

interface IProps {
  children?: ReactNode
}

const PlayerBar: FC<IProps> = () => {
  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false)

  const {
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
  } = usePlayerBar()

  const modeIcon = useMemo(() => {
    const mode = playMode % 3

    if (mode === playModeEnum.order) {
      return "icon-bar_icon_list"
    } else if (mode === playModeEnum.loop) {
      return "icon-bar_icon_loop"
    } else if (mode === playModeEnum.random) {
      return "icon-bar_icon_random"
    }
  }, [playMode])

  return (
    <BarMotionWrapper
      initial={{ translateY: "100%" }}
      animate={{ translateY: "0%" }}
      transition={{ duration: 0.25, ease: "linear" }}
    >
      <div className="player-bar-content">
        <BarLeftLayout>
          <div className="album-pic">
            <Image
              src={currentPlay.picUrl}
              preview={false}
              placeholder={
                <Image src={getImg("placeholder_bg")} preview={false} />
              }
            />
          </div>

          <div style={{ flexGrow: 1 }}>
            <div className="header-layout">
              <div className="song-info">
                <div className="name">{currentPlay.name}</div>

                <div className="artist">
                  {"\u00A0-\u00A0"}
                  {currentPlay.artist}
                </div>
              </div>

              <div className="duration">
                {`${formatDuration(currentTime)}/${formatDuration(
                  currentPlay.playDuration
                )}`}
              </div>
            </div>

            <Slider
              style={{ margin: 0 }}
              value={playProgress}
              step={0.1}
              tooltip={{ open: false }}
              onChange={onProgressChanging}
              onChangeComplete={onProgressChanged}
            />
          </div>
        </BarLeftLayout>

        <BarMiddleLayout>
          {/* 上一首 */}
          <div className="prev-btn" onClick={() => switchSongs(false)}>
            <i className="iconfont icon-bar_icon_pre"></i>
          </div>

          {/* 播放暂停 */}
          <div className="play-btn" onClick={play}>
            <i
              className={`iconfont ${
                playStatus ? "icon-bar_icon_pause" : "icon-bar_icon_play_1"
              }`}
            ></i>
          </div>

          {/* 下一首 */}
          <div className="next-btn" onClick={() => switchSongs(true)}>
            <i className="iconfont icon-bar_icon_next"></i>
          </div>
        </BarMiddleLayout>

        <BarRightLayout>
          {/* 播放模式 */}
          <div className="play-mode-btn" onClick={onPlayModeChange}>
            <i className={`iconfont ${modeIcon}`}></i>
          </div>

          {/* 播放列表 */}
          <div
            className="playlist-btn"
            onClick={() => setShowPlaylistPopup(!showPlaylistPopup)}
          >
            <i className="iconfont icon-bar_icon_playlistfuzhi"></i>

            <div className="playlist-num">{playlist.length}</div>
          </div>

          {/* 音量控制 */}
          <div className="volume-control">
            <i
              className={`iconfont ${
                volumeProgress === 0
                  ? "icon-bar_icon_mute"
                  : "icon-bar_icon_volume"
              }`}
              onClick={onMutedChange}
            ></i>

            <Slider
              className="volume-progress"
              value={volumeProgress}
              onChange={onVolumeProgressChanging}
              onChangeComplete={onVolumeProgressChanged}
            />
          </div>
        </BarRightLayout>

        {showPlaylistPopup && <PlaylistPopup />}
      </div>

      <audio autoPlay src={currentPlay.playUrl} ref={audioRef}></audio>
    </BarMotionWrapper>
  )
}

export default memo(PlayerBar)
