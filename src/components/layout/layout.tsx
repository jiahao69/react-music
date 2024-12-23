import { memo } from "react"
import type { FC, ReactNode } from "react"
import { Outlet, NavLink } from "react-router-dom"

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
    <div className="app-content">
      <div className="nav-bar-wrapper">
        {navList.map((item) => (
          <NavLink className="nav-item" key={item.name} to={item.path}>
            {item.name}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  )
}

export default memo(Layout)
