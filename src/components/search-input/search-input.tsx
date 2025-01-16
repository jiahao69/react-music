import { memo, useState } from "react"
import type { FC, ReactNode } from "react"

import { SearchInputWrapper } from "./search-input-style"

interface IProps {
  children?: ReactNode
}

const SearchInput: FC<IProps> = () => {
  const [showHotSearch, setShowHotSearch] = useState(false)

  return (
    <SearchInputWrapper>
      <div className="search-input-wrapper">
        <input
          className="search-input"
          onFocus={() => setShowHotSearch(true)}
          onBlur={() => setShowHotSearch(false)}
          placeholder="搜索音乐/MV/歌单/歌手"
          maxLength={128}
          type="text"
        />

        <div className="search-icon">
          <i className="iconfont icon-header_icon_search"></i>
        </div>
      </div>

      {showHotSearch && (
        <div className="hot-search-wrapper">
          <div className="hot-search-title">大家都在搜</div>
        </div>
      )}
    </SearchInputWrapper>
  )
}

export default memo(SearchInput)
