import { memo } from "react"
import type { FC, ReactNode } from "react"
import { useHomeStore } from "@/store/modules"

import { PlaylistPopupWrapper } from "./playlist-popup-style"

interface IProps {
  children?: ReactNode
}

const PlaylistPopup: FC<IProps> = () => {
  const playlist = useHomeStore((state) => state.playlist)

  return (
    <PlaylistPopupWrapper>
      {playlist.map((item) => (
        <div>{item.name}</div>
      ))}
    </PlaylistPopupWrapper>
  )
}

export default memo(PlaylistPopup)
