import { memo } from "react"
import type { FC, ReactNode } from "react"

import { PlaylistPopupWrapper } from "./playlist-popup-style"

interface IProps {
  children?: ReactNode
}

const PlaylistPopup: FC<IProps> = () => {
  return <PlaylistPopupWrapper>PlaylistPopup</PlaylistPopupWrapper>
}

export default memo(PlaylistPopup)
