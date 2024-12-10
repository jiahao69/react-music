import { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const Rankings: FC<IProps> = () => {
  return <div>Rankings</div>
}

export default memo(Rankings)
