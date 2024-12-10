import { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const Mvs: FC<IProps> = () => {
  return <div>Mvs</div>
}

export default memo(Mvs)
