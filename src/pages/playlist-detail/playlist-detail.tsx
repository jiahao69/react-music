import { memo, useEffect } from "react"
import type { FC, ReactNode } from "react"
import { useParams } from "react-router-dom"

import { getPlaylistDetail, getSongDetail } from "@/service/modules"

interface IProps {
  children?: ReactNode
}

const PlaylistDetail: FC<IProps> = () => {
  const { id } = useParams()

  const _getPlaylistDetail = async () => {
    const { playlist } = await getPlaylistDetail({ id: +id! })

    const ids = playlist.trackIds.map((item: any) => item.id).join(",")

    getSongDetail({ ids })
  }

  useEffect(() => {
    _getPlaylistDetail()
  }, [])

  return <div>{id}</div>
}

export default memo(PlaylistDetail)
