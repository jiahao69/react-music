import { memo } from "react"
import type { FC, ReactNode } from "react"
import { Outlet } from "react-router-dom"

import NavBar from "@/components/nav-bar/nav-bar"

interface IProps {
  children?: ReactNode
}

const navList = [
  { name: "推荐", path: "/" },
  { name: "排行榜", path: "/rankings" },
  { name: "歌手", path: "/singers" },
  { name: "歌单", path: "/playlists" },
  { name: "MV", path: "/mvs" }
]

const Layout: FC<IProps> = () => {
  return (
    <>
      <div style={{ padding: "16px 0", paddingLeft: "206px" }}>
        <NavBar list={navList} isLink={true} />
      </div>

      <Outlet />
    </>
  )
}

export default memo(Layout)
