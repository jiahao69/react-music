import { memo, useState, useEffect } from "react"
import type { FC, ReactNode } from "react"
import { useParams } from "react-router-dom"
import { Image, Avatar } from "antd"

import { PlaylistDetailWrapper } from "./playlist-detail-style"
import { getImg } from "@/utils/files"
import { getPlaylistDetail, getSongDetail } from "@/service/modules"

interface IProps {
  children?: ReactNode
}

const PlaylistDetail: FC<IProps> = () => {
  const { id } = useParams()

  const [playlist, setPlaylist] = useState<any>({})
  const [songs, setSongs] = useState<any[]>([])

  const _getPlaylistDetail = async () => {
    const { playlist } = await getPlaylistDetail({ id: +id! })

    setPlaylist(playlist)

    const ids = playlist.trackIds.map((item: any) => item.id).join(",")

    const { songs } = await getSongDetail({ ids })

    setSongs(songs)
  }

  useEffect(() => {
    _getPlaylistDetail()
  }, [])

  return (
    <PlaylistDetailWrapper>
      <div className="left-layout">
        <div className="playlist-pic">
          <Image
            width={322}
            src={playlist.coverImgUrl}
            preview={false}
            placeholder={
              <Image src={getImg("placeholder_bg")} preview={false} />
            }
          />
        </div>

        <div className="playlist-desc">歌单简介</div>

        <div className="playlist-desc-content">{playlist.description}</div>
      </div>

      <div className="right-layout">
        <div className="playlist-title">{playlist.name}</div>

        <div className="playlist-creator">
          <div className="playlist-creator-avatar">
            <Avatar src={playlist.creator?.avatarUrl} />
          </div>
          <span>{playlist.creator?.nickname}</span>
        </div>
      </div>
    </PlaylistDetailWrapper>
  )
}

export default memo(PlaylistDetail)
