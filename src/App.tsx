import { useRoutes, NavLink } from "react-router-dom"
import { Suspense } from "react"

import { routes } from "@/router"
import { AppWrapper } from "./App.style"

import HeaderBar from "@/components/header-bar/header-bar"

const navList = [
  { name: "推荐", path: "/" },
  { name: "排行榜", path: "/rankings" },
  { name: "歌手", path: "/singers" },
  { name: "歌单", path: "/playlists" },
  { name: "MV", path: "/mvs" }
]

function App() {
  return (
    <AppWrapper>
      <HeaderBar />

      <div className="app-content">
        <div className="nav-bar-wrapper">
          {navList.map((item) => (
            <NavLink className="nav-item" key={item.name} to={item.path}>
              {item.name}
            </NavLink>
          ))}
        </div>

        <Suspense fallback="">{useRoutes(routes)}</Suspense>
      </div>
    </AppWrapper>
  )
}

export default App
