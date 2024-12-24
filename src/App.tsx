import { Fragment, Suspense } from "react"
import { useRoutes } from "react-router-dom"

import { routes } from "@/router"

import HeaderBar from "@/components/header-bar/header-bar"

function App() {
  return (
    <Fragment>
      <HeaderBar />

      <div style={{ padding: "0 256px", paddingBottom: "60px" }}>
        <Suspense fallback="">{useRoutes(routes)}</Suspense>
      </div>
    </Fragment>
  )
}

export default App
