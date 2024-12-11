import { memo, useState, useEffect } from "react"
import type { FC, ReactNode } from "react"

import { getPlaylists } from "@/service/modules"

import PlaylistItem from "@/components/playlist-item/playlist-item"

interface IProps {
  children?: ReactNode
}

const Playlists: FC<IProps> = () => {
  const [playlists, setPlaylists] = useState([])

  const _getPlaylists = async (cat: string) => {
    const { playlists } = await getPlaylists({ cat, limit: 20 })

    const newPlaylist = playlists.map((item: any) => {
      const index = item.coverImgUrl.indexOf("?")

      const coverImgUrl = item.coverImgUrl.slice(0, index)

      return { ...item, coverImgUrl }
    })

    setPlaylists(newPlaylist)
  }

  useEffect(() => {
    _getPlaylists("全部歌单")
  }, [])

  return (
    <div
      className="list"
      style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}
    >
      {playlists.map((item: any) => (
        <PlaylistItem item={item} key={item.id} />
      ))}
    </div>
  )
}

export default memo(Playlists)
