import { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const Playlists: FC<IProps> = () => {
  return <div>Playlists</div>
}

export default memo(Playlists)
