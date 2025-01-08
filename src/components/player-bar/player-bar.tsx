import { memo } from "react"
import type { FC, ReactNode } from "react"
import { Slider, ConfigProvider } from "antd"

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
    play,
    prev,
    next,
    handleProgressChange,
    handleProgressCompleteChange
  } = usePlayerBar()

  return (
    <PlayerBarWrapper>
      <div className="player-bar-wrapper">
        <div className="player-bar-content">
          <div className="left-layout">
            <div className="song-pic">
              <img src={currentPlay.picUrl} alt="" />
            </div>

            <div
              style={{
                flex: 1
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "11px"
                }}
              >
                <div className="song-info">
                  <span className="name">{currentPlay.name}</span>
                  <span className="artist">{` - ${currentPlay.artist}`}</span>
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
                  value={playProgress}
                  tooltip={{ open: false }}
                  onChange={handleProgressChange}
                  onChangeComplete={handleProgressCompleteChange}
                />
              </ConfigProvider>
            </div>
          </div>

          <div className="middle-layout">
            {/* 上一首 */}
            <div className="prev-btn" onClick={prev}>
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
            <div className="next-btn" onClick={next}>
              <i className="iconfont icon-bar_icon_next"></i>
            </div>
          </div>

          <div className="right-layout">
            <div className="like-btn">
              <i className="iconfont icon-bar_icon_heart"></i>
            </div>

            <div className="mode-btn">
              <i className="iconfont icon-bar_icon_list"></i>
            </div>

            <div className="playlist-btn">
              <i className="iconfont icon-bar_icon_playlistfuzhi"></i>
            </div>
          </div>
        </div>
      </div>

      <audio src={currentPlay.playUrl} autoPlay ref={audioRef}></audio>
    </PlayerBarWrapper>
  )
}

export default memo(PlayerBar)
