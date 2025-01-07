import { memo } from "react"
import type { FC, ReactNode } from "react"
import { Slider, ConfigProvider } from "antd"

import { PlayerBarWrapper } from "./player-bar-style"
import { useHomeStore } from "@/store/modules"

interface IProps {
  children?: ReactNode
}

const PlayerBar: FC<IProps> = () => {
  const playlists = useHomeStore((state) => state.playlists)
  const playIndex = useHomeStore((state) => state.playIndex)

  if (playlists.length)
    return (
      <PlayerBarWrapper>
        <div className="left-layout">
          <div className="song-pic">
            <img src={playlists[playIndex]?.picUrl} alt="" />
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
                alignItems: "center"
              }}
            >
              <div className="song-info">
                <span className="name">{playlists[playIndex]?.name}</span>
                <span className="singer">-{playlists[playIndex]?.singer}</span>
              </div>

              <div className="duration">{`00:00/${playlists[playIndex]?.duration}`}</div>
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
                tooltip={{ open: false }}
                onChange={(value) => {
                  console.log(value)
                }}
              />
            </ConfigProvider>
          </div>
        </div>
      </PlayerBarWrapper>
    )
}

export default memo(PlayerBar)
