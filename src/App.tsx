import { Suspense } from "react"
import { useRoutes } from "react-router-dom"
import { ConfigProvider } from "antd"

import { routes } from "@/router"
import { useHomeStore } from "@/store/modules"

import HeaderBar from "@/components/header-bar/header-bar"
import PlayerBar from "@/components/player-bar/player-bar"

function App() {
  const playlist = useHomeStore((state) => state.playlist)

  return (
    <>
      <HeaderBar />

      <ConfigProvider
        theme={{
          components: {
            Slider: {
              railSize: 3
            }
          }
        }}
      >
        {!!playlist.length && <PlayerBar />}
      </ConfigProvider>

      <div
        style={{
          padding: "0 256px",
          paddingBottom: playlist.length ? "132px" : "60px"
        }}
      >
        <Suspense fallback="">{useRoutes(routes)}</Suspense>
      </div>
    </>
  )
}

export default App
