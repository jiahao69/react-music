import { memo, useState } from "react"
import type { FC, ReactNode } from "react"
import classNames from "classnames"
import { NavLink } from "react-router-dom"

import { NavBarWrapper } from "./nav-bar-style"

interface INavItem {
  name: string
  path?: string
}

interface IProps {
  children?: ReactNode
  list: INavItem[]
  isLink?: boolean
  onItemClick?: (item: INavItem) => void
}

const NavBar: FC<IProps> = (props) => {
  const { list, isLink = false, onItemClick } = props

  const [currentIndex, setCurrentIndex] = useState(0)

  const haneleNavItemClick = (item: INavItem, index: number) => {
    if (currentIndex === index) return

    setCurrentIndex(index)

    onItemClick && onItemClick(item)
  }

  if (isLink)
    return (
      <NavBarWrapper>
        {list.map((item) => (
          <NavLink className="nav-item" key={item.name} to={item.path!}>
            {item.name}
          </NavLink>
        ))}
      </NavBarWrapper>
    )

  if (!isLink)
    return (
      <NavBarWrapper>
        {list.map((item, index) => (
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
