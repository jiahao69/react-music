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

const PlaylistsItem: FC<IProps> = (props) => {
  const { item } = props

  const getPlayCount = (count: number) => {
    if (count < 10 * 10000) return count

    return `${Math.floor(count / 10000)}万`
  }

  return (
    <PlaylistItemWrapper>
      <div className="playlist-pic-wrapper">
        <Image
          className="playlist-pic"
          src={item.coverImgUrl}
          preview={false}
          placeholder={<Image src={getImg("placeholder_bg")} preview={false} />}
        />

        <div className="playlist-pic-mask">
          <PlayCircleFilled className="play-icon" />
        </div>
      </div>

      <div className="playlist-title">{item.name}</div>

      <div className="playlist-count">{getPlayCount(item.playCount)}</div>
    </PlaylistItemWrapper>
  )
}

export default memo(PlaylistsItem)
