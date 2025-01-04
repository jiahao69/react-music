import { memo, useState, useEffect } from "react"
import type { FC, ReactNode } from "react"
import { useParams } from "react-router-dom"
import { Avatar } from "antd"

import { PlaylistDetailWrapper } from "./playlist-detail-style"
import { getPlaylistDetail, getSongDetail } from "@/service/modules"

import SongList from "@/components/song-list/song-list"

interface IProps {
  children?: ReactNode
}

const PlaylistDetail: FC<IProps> = () => {
  const { id } = useParams()

  const [playlist, setPlaylist] = useState<any>({})
  const [songs, setSongs] = useState<any[]>([])

  const _getPlaylistDetail = () => {
    getPlaylistDetail({ id: +id! })
      .then(({ playlist }) => {
        setPlaylist(playlist)

        return playlist
      })
      .then(async (playlist) => {
        const ids = playlist.trackIds.map((item: any) => item.id).join(",")

        const { songs } = await getSongDetail({ ids })

        setSongs(songs)
      })
  }

  useEffect(() => {
    _getPlaylistDetail()
  }, [])

  return (
    <PlaylistDetailWrapper>
      <div className="playlist-left-layout">
        <div className="playlist-pic">
          <img
            src={playlist.backgroundCoverUrl || playlist.coverImgUrl}
            alt=""
          />
        </div>

        <div className="playlist-desc-title">歌单简介</div>

        <div className="playlist-desc">{playlist.description}</div>
      </div>

      <div className="playlist-right-layout">
        <div className="playlist-title">{playlist.name}</div>

        <div className="playlist-creator">
          <div className="playlist-creator-avatar">
            <Avatar src={playlist.creator?.avatarUrl} />
          </div>

          <div className="playlist-creator-name">
            {playlist.creator?.nickname}
          </div>
        </div>

        <div className="playlist-tags">{playlist.tags?.join(",")}</div>

        <SongList list={songs} />
      </div>
    </PlaylistDetailWrapper>
  )
}

export default memo(PlaylistDetail)
