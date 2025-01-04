import { memo } from "react"
import type { FC, ReactNode } from "react"

import { PlayerBarWrapper } from "./player-bar-style"

interface IProps {
  children?: ReactNode
}

const PlayerBar: FC<IProps> = () => {
  return (
    <PlayerBarWrapper>
      <div>PlayerBar</div>
    </PlayerBarWrapper>
  )
}

export default memo(PlayerBar)
