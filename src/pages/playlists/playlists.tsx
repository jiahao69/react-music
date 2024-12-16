import { memo, useState, useEffect, useRef } from "react"
import type { FC, ReactNode } from "react"
import { Pagination } from "antd"

import { PlaylistsWrapper } from "./playlists-style"
import { getPlaylists, getPlaylistCats } from "@/service/modules"

import PlaylistItem from "@/components/playlist-item/playlist-item"

interface IProps {
  children?: ReactNode
}

const Playlists: FC<IProps> = () => {
  const [playlists, setPlaylists] = useState([])
  const [playlistsTotal, setPlaylistsTotal] = useState(0)
  const [catList, setCatList] = useState<any[]>([])
  const catRef = useRef("华语")

  const _getPlaylistCats = async () => {
    const { categories, sub } = await getPlaylistCats()

    const catList = Object.keys(categories).map((key) => {
      const filterList = sub.filter((item: any) => +item.category === +key)

      return { name: categories[key], list: filterList }
    })

    console.log(catList)

    setCatList(catList)
  }

  const _getPlaylists = async (cat: string, offset = 0, isMore = false) => {
    const result = await getPlaylists({
      cat,
      offset,
      limit: 20
    })

    const newPlaylists = result.playlists.map((item: any) => {
      const index = item.coverImgUrl.indexOf("?")

      const coverImgUrl = item.coverImgUrl.slice(0, index)

      return { ...item, coverImgUrl }
    })

    if (isMore) {
      // 翻页后滚动到顶部
      document.body.scrollIntoView()
    }

    if (!isMore) {
      setPlaylistsTotal(result.total)
    }

    setPlaylists(newPlaylists)
  }

  const handlePageChange = (page: number) => {
    _getPlaylists(catRef.current, (page - 1) * 20, true)
  }

  useEffect(() => {
    _getPlaylists(catRef.current)

    _getPlaylistCats()
  }, [])

  return (
    <PlaylistsWrapper>
      <div className="playlists">
        {playlists.map((item: any) => (
          <PlaylistItem item={item} key={item.id} />
        ))}
      </div>

      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          defaultPageSize={20}
          total={playlistsTotal}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </PlaylistsWrapper>
  )
}

export default memo(Playlists)
