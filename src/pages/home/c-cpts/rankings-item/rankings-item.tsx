import { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const RankingsItem: FC<IProps> = () => {
  return <div>RankingsItem</div>
}

export default memo(RankingsItem)
