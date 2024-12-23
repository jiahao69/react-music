import { useRoutes } from "react-router-dom"
import { Suspense } from "react"

import { routes } from "@/router"
import { AppWrapper } from "./App.style"

import HeaderBar from "@/components/header-bar/header-bar"

function App() {
  return (
    <AppWrapper>
      <HeaderBar />

      <Suspense fallback="">{useRoutes(routes)}</Suspense>
    </AppWrapper>
  )
}

export default App
