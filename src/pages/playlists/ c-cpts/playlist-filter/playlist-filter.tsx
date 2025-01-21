import { memo, useState } from "react"
import type { FC, ReactNode } from "react"
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

        <i
          className="iconfont icon-bar_icon_arrow"
          style={{ transform: `rotate(${showPanel ? "180deg" : 0})` }}
        ></i>
      </div>

      {showPanel && (
        <div className="catetory-panel">
          {list.map((item) => (
            <div className="catetory-item" key={item.name}>
              <div className="catetory-name">{item.name}</div>

              <div className="catetory-detail-list">
                {item.list.map((item: any) => (
                  <div
                    className={classNames("catetory-detail-item", {
                      active: item.name === currentCat
                    })}
                    key={item.name}
                    onClick={() => {
                      setCurrentCat(item.name)
                      setShowPanel(false)

                      onItemClick && onItemClick(item.name)
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
