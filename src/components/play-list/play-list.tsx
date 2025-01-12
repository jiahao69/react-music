import { memo } from "react"
import type { FC, ReactNode } from "react"

import { PlayListWrapper } from "./play-list-style"

interface IProps {
  children?: ReactNode
}

const PLayList: FC<IProps> = () => {
  return <PlayListWrapper>PLayList</PlayListWrapper>
}

export default memo(PLayList)
