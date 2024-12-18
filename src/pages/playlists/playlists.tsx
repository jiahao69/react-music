import { memo, useState, useEffect, useRef, Fragment } from "react"
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
  const [playlistsTotal, setPlaylistsTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [playlists, setPlaylists] = useState([])
  const [playlistsCatList, setPlaylistsCatList] = useState<any[]>([])
  const catRef = useRef("")

  // 获取歌单分类列表
  const _getPlaylistCats = async () => {
    const { categories, sub } = await getPlaylistCats()

    const catList = Object.keys(categories).map((key) => {
      const list = sub.filter((item: any) => +item.category === +key)

      return { name: categories[key], list }
    })

    catList.unshift({ name: "默认", list: [{ name: "全部" }] })

    setPlaylistsCatList(catList)
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
      setPlaylistsTotal(result.total)

      setCurrentPage(1)
    }
  }

  const handlePageChange = (page: number) => {
    // 翻页滚动回到顶部
    document.body.scrollIntoView()

    setPlaylists([])
    setCurrentPage(page)

    _getPlaylists(catRef.current, (page - 1) * PAGE_SIZE, true)
  }

  useEffect(() => {
    _getPlaylists()

    _getPlaylistCats()
  }, [])

  return (
    <PlaylistsWrapper>
      <PlaylistFilter
        list={playlistsCatList}
        onItemClick={(cat) => {
          catRef.current = cat

          setPlaylists([])

          _getPlaylists(cat)
        }}
      />

      {!!playlists.length && (
        <Fragment>
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
              total={playlistsTotal}
              showSizeChanger={false}
              onChange={handlePageChange}
            />
          </div>
        </Fragment>
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
