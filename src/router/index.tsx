import { lazy } from "react"
import { type RouteObject } from "react-router-dom"

const Home = lazy(() => import("@/pages/home/home"))
const Rankings = lazy(() => import("@/pages/rankings"))
const Singers = lazy(() => import("@/pages/singers"))
const Playlists = lazy(() => import("@/pages/playlists"))
const Mvs = lazy(() => import("@/pages/mvs"))

export const routes: RouteObject[] = [
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
