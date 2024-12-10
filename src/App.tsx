import { useRoutes, useNavigate } from "react-router-dom"
import { Suspense } from "react"

import { routes } from "@/router"
import { AppWrapper } from "./App.style"

import HeaderBar from "@/components/header-bar/header-bar"
import NavBar from "@/components/nav-bar/nav-bar"

const navList = [
  { name: "推荐", path: "/" },
  { name: "排行榜", path: "/rankings" },
  { name: "歌手", path: "/singers" },
  { name: "歌单", path: "/playlists" },
  { name: "MV", path: "/mvs" }
]

function App() {
  const navigate = useNavigate()

  const handleNavItemClick = (item: any) => {
    navigate(item.path)
  }

  return (
    <AppWrapper>
      <HeaderBar />

      <div className="app-wrapper">
        <div className="nav-bar-wrapper">
          <NavBar list={navList} onItemClick={handleNavItemClick} />
        </div>

        <Suspense fallback="">{useRoutes(routes)}</Suspense>
      </div>
    </AppWrapper>
  )
}

export default App
