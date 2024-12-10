import { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const Singers: FC<IProps> = () => {
  return <div>Singers</div>
}

export default memo(Singers)
