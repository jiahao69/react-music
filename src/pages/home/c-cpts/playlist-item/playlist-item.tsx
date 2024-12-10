import { memo } from "react"
import type { FC, ReactNode } from "react"
import { PlayCircleFilled } from "@ant-design/icons"
import { Image } from "antd"

import { getImg } from "@/utils/files"
import { PlaylistItemWrapper } from "./playlist-item-style"

interface IProps {
  children?: ReactNode
  item: { coverImgUrl: string; name: string; playCount: number }
}

const PlaylistItem: FC<IProps> = (props) => {
  const { item } = props

  return (
    <PlaylistItemWrapper>
      <div className="playlist-pic-wrapper">
        <Image
          className="playlist-pic"
          src={item.coverImgUrl}
          preview={false}
          placeholder={
            <Image preview={false} src={getImg("def270.78de220")} width={264} />
          }
        />

        <div className="playlist-pic-mask">
          <PlayCircleFilled className="play-icon" />
        </div>
      </div>

      <div className="playlist-title">{item.name}</div>

      <div className="playlist-count">{`${item.playCount / 10000}万`}</div>
    </PlaylistItemWrapper>
  )
}

export default memo(PlaylistItem)
