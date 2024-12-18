import { memo, useState } from "react"
import type { FC, ReactNode } from "react"
import { FaAngleDown } from "react-icons/fa6"
import classNames from "classnames"

import { PlaylistsFilterWrapper } from "./playlist-filter-style"

interface IProps {
  children?: ReactNode
  list: any[]
  onItemClick?: (cat: string) => void
}

const PlaylistsFilter: FC<IProps> = (props) => {
  const { list, onItemClick } = props

  const [currentCat, setCurrentCat] = useState("全部")
  const [showPanel, setShowPanel] = useState(false)

  return (
    <PlaylistsFilterWrapper>
      <div
        className="current-catetory"
        onClick={() => setShowPanel(!showPanel)}
      >
        <span className="current-catetory-name">{currentCat}</span>

        <FaAngleDown
          style={{ transform: `rotate(${showPanel ? "180deg" : 0})` }}
        />
      </div>

      {showPanel && (
        <div className="catetory-panel">
          {list.map((item) => (
            <div className="catetory-item" key={item.name}>
              <div style={{ display: "flex" }}>
                <div className="catetory-name">{item.name}</div>
              </div>

              <div className="catetory-detail-list">
                {item.list.map((item: any) => (
                  <div
                    className={classNames("catetory-detail-item", {
                      active: item.name === currentCat
                    })}
                    key={item.name}
                    onClick={() => {
                      onItemClick && onItemClick(item.name)
                      setCurrentCat(item.name)
                      setShowPanel(false)
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </PlaylistsFilterWrapper>
  )
}

export default memo(PlaylistsFilter)
