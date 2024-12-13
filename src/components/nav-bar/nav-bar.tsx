import { memo, useState } from "react"
import type { FC, ReactNode } from "react"
import classNames from "classnames"

import { NavBarWrapper } from "./nav-bar-style"

interface INavItem {
  name: string
  path?: string
}

interface IProps {
  children?: ReactNode
  list?: INavItem[]
  onItemClick?: (item: INavItem) => void
}

const NavBar: FC<IProps> = (props) => {
  const { list, onItemClick } = props

  const [currentIndex, setCurrentIndex] = useState(0)

  const haneleNavItemClick = (item: INavItem, index: number) => {
    if (currentIndex === index) return

    setCurrentIndex(index)

    onItemClick && onItemClick(item)
  }

  return (
    <NavBarWrapper>
      {list?.map((item, index) => (
        <div
          className={classNames("nav-item", {
            "nav-item--active": index === currentIndex
          })}
          key={item.name}
          onClick={() => haneleNavItemClick(item, index)}
        >
          {item.name}
        </div>
      ))}
    </NavBarWrapper>
  )
}

export default memo(NavBar)
