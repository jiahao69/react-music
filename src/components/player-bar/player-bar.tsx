import { memo } from "react"
import type { FC, ReactNode } from "react"
import { Slider, ConfigProvider } from "antd"
import { motion } from "motion/react"

import { PlayerBarWrapper } from "./player-bar-style"
import { formatDuration } from "@/utils/format-duration"
import { usePlayerBar } from "@/hooks/use-player-bar"

interface IProps {
  children?: ReactNode
}

const PlayerBar: FC<IProps> = () => {
  const {
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
  } = usePlayerBar()

  const getModeIcon = () => {
    const index = playMode % 3

    if (index === 0) {
      return "icon-bar_icon_list"
    } else if (index === 1) {
      return "icon-bar_icon_loop"
    } else if (index === 2) {
      return "icon-bar_icon_random"
    }
  }

  return (
    <PlayerBarWrapper>
      <motion.div
        className="player-bar-wrapper"
        initial={{ translateY: "100%" }}
        animate={{ translateY: "0%" }}
        transition={{ duration: 0.3, ease: "linear" }}
      >
        <div className="player-bar-content">
          <div className="bar-left-layout">
            <div className="album-pic">
              <img src={currentPlay.picUrl} alt="" />
            </div>

            <div className="right-layout">
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

              <ConfigProvider
                theme={{
                  components: {
                    Slider: {
                      railSize: 3
                    }
                  }
                }}
              >
                <Slider
                  style={{ margin: 0 }}
                  value={playProgress}
                  step={0.5}
                  tooltip={{ open: false }}
                  onChange={onProgressChanging}
                  onChangeComplete={onProgressChanged}
                />
              </ConfigProvider>
            </div>
          </div>

          <div className="bar-middle-layout">
            {/* 上一首 */}
            <div className="prev-btn" onClick={prev}>
              <i className="iconfont icon-bar_icon_pre"></i>
            </div>

            {/* 播放控制 */}
            <div className="play-btn" onClick={play}>
              <i
                className={`iconfont ${
                  playStatus ? "icon-bar_icon_pause" : "icon-bar_icon_play_1"
                }`}
              ></i>
            </div>

            {/* 下一首 */}
            <div className="next-btn" onClick={next}>
              <i className="iconfont icon-bar_icon_next"></i>
            </div>
          </div>

          <div className="bar-right-layout">
            <div className="like-btn">
              <i className="iconfont icon-bar_icon_heart"></i>
            </div>

            {/* 播放模式 */}
            <div className="play-mode-btn" onClick={onPlayModeChange}>
              <i className={`iconfont ${getModeIcon()}`}></i>
            </div>

            <div className="playlist-btn">
              <i className="iconfont icon-bar_icon_playlistfuzhi"></i>
            </div>

            <div className="volume-control">
              <i
                className="iconfont icon-bar_icon_volume"
                onClick={onVolumeClick}
              ></i>

              <ConfigProvider
                theme={{
                  components: {
                    Slider: {
                      railSize: 3
                    }
                  }
                }}
              >
                <Slider
                  className="volume-progress"
                  defaultValue={50}
                  tooltip={{ open: false }}
                  onChangeComplete={onVolumeProgressChanged}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </motion.div>

      <audio autoPlay src={currentPlay.playUrl} ref={audioRef}></audio>
    </PlayerBarWrapper>
  )
}

export default memo(PlayerBar)
