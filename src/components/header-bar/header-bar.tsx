import { memo } from "react"
import type { FC, ReactNode } from "react"

import { HeaderBarWrapper } from "./header-bar-style"
import { getImg } from "@/utils/files"

import SearchInput from "@/components/search-input/search-input"

interface IProps {
  children?: ReactNode
}

const HeaderBar: FC<IProps> = () => {
  return (
    <HeaderBarWrapper>
      <a href="/">
        <img className="logo" src={getImg("logo")} alt="" />
      </a>

      <SearchInput />
    </HeaderBarWrapper>
  )
}

export default memo(HeaderBar)
