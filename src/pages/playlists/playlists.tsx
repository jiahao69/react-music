import { memo, useState, useEffect, useRef } from "react"
import type { FC, ReactNode } from "react"
import { Pagination, Spin } from "antd"

import { PlaylistsWrapper } from "./playlists-style"
import { getPlaylists, getPlaylistCats } from "@/service/modules"

import PlaylistItem from "@/components/playlist-item/playlist-item"
import PlaylistFilter from "./ c-cpts/playlist-filter/playlist-filter"

interface IProps {
  children?: ReactNode
}

// 每页条数
const PAGE_SIZE = 20

const Playlists: FC<IProps> = () => {
  const [playlistTotal, setPlaylistTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [playlists, setPlaylists] = useState<any[]>([])
  const [playlistCats, setPlaylistCats] = useState<any[]>([])
  const catRef = useRef("")

  // 获取歌单分类列表
  const _getPlaylistCats = async () => {
    const { categories, sub } = await getPlaylistCats()

    const playlistCats = Object.keys(categories).map((key) => {
      const list = sub.filter((item: any) => item.category === +key)

      return { name: categories[key], list }
    })

    playlistCats.unshift({ name: "默认", list: [{ name: "全部" }] })

    setPlaylistCats(playlistCats)
  }

  // 获取歌单列表
  const _getPlaylists = async (cat = "全部", offset = 0, isMore = false) => {
    const result = await getPlaylists({
      cat,
      offset,
      limit: PAGE_SIZE
    })

    const playlists = result.playlists.map((item: any) => {
      const index = item.coverImgUrl.indexOf("?")

      const coverImgUrl = item.coverImgUrl.slice(0, index)

      return { ...item, coverImgUrl }
    })

    setPlaylists(playlists)

    // 切换歌单分类，重置歌单数量，重置当前页数
    if (!isMore) {
      setPlaylistTotal(result.total)

      setCurrentPage(1)
    }
  }

  // 翻页时触发
  const handlePageChange = (page: number) => {
    // 清空原数据，设置新页码
    setPlaylists([])
    setCurrentPage(page)

    // 获取下一页歌单列表
    _getPlaylists(catRef.current, (page - 1) * PAGE_SIZE, true)
  }

  useEffect(() => {
    _getPlaylists()

    _getPlaylistCats()
  }, [])

  return (
    <PlaylistsWrapper>
      <PlaylistFilter
        list={playlistCats}
        onItemClick={(cat) => {
          if (cat === catRef.current) return

          catRef.current = cat

          setPlaylists([])
          _getPlaylists(cat)
        }}
      />

      {!!playlists.length && (
        <>
          <div className="playlists">
            {playlists.map((item: any) => (
              <PlaylistItem item={item} key={item.id} />
            ))}
          </div>

          <div className="pagination-wrapper">
            <Pagination
              current={currentPage}
              defaultCurrent={1}
              defaultPageSize={20}
              total={playlistTotal}
              showSizeChanger={false}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}

      {!!!playlists.length && (
        <div className="loading">
          <Spin size="large" />
        </div>
      )}
    </PlaylistsWrapper>
  )
}

export default memo(Playlists)
