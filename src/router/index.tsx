import { lazy } from "react"
import { type RouteObject } from "react-router-dom"

const Layout = lazy(() => import("@/components/layout/layout"))
const Home = lazy(() => import("@/pages/home/home"))
const Rankings = lazy(() => import("@/pages/rankings"))
const Singers = lazy(() => import("@/pages/singers"))
const Playlists = lazy(() => import("@/pages/playlists/playlists"))
const Mvs = lazy(() => import("@/pages/mvs"))
const PlaylistDetail = lazy(
  () => import("@/pages/playlist-detail/playlist-detail")
)

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/rankings",
        element: <Rankings />
      },
      {
        path: "/singers",
        element: <Singers />
      },
      {
        path: "/playlists",
        element: <Playlists />
      },
      {
        path: "/mvs",
        element: <Mvs />
      }
    ]
  },
  {
    path: "/playlist-detail/:id",
    element: <PlaylistDetail />
  }
]
