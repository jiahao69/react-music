import { memo } from "react"
import type { FC, ReactNode } from "react"
import { useHomeStore } from "@/store/modules"

import { PlaylistPopupWrapper } from "./playlist-popup-style"
import { formatDuration } from "@/utils/format-duration"

interface IProps {
  children?: ReactNode
}

const PlaylistPopup: FC<IProps> = () => {
  const playlist = useHomeStore((state) => state.playlist)

  return (
    <PlaylistPopupWrapper>
      <div className="playlist-header">
        <div>
          <span className="playlist-text">播放列表</span>
          <span className="playlist-num">{`(共${playlist.length}首歌)`}</span>
        </div>
        <div className="clear-playlist">
          <i className="iconfont icon-list_clean_n"></i>
          <span>清空列表</span>
        </div>
      </div>

      <div className="playlists">
        {playlist.map((item, index) => (
          <div className="playlist-item" key={item.id}>
            <div className="serial-number">{index + 1}</div>
            <div className="song-name">
              <span> {item.name}</span>
            </div>
            <div className="artist">{item.artist}</div>
            <div className="duration">{formatDuration(item.duration)}</div>
          </div>
        ))}
      </div>
    </PlaylistPopupWrapper>
  )
}

export default memo(PlaylistPopup)
