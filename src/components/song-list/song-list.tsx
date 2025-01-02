import { memo, useState } from "react"
import type { FC, ReactNode } from "react"
import { Table } from "antd"

import { SongListWrapper } from "./song-list-style"

interface IProps {
  children?: ReactNode
  list: any[]
}

const { Column } = Table

const SongList: FC<IProps> = (props) => {
  const { list } = props

  const [currentPage, setCurrentPage] = useState(1)

  const formatDuration = (duration: number) => {
    const durationSeconds = duration / 1000

    const minute = (Math.floor(durationSeconds / 60) + "").padStart(2, "0")

    const seconds = (Math.floor(durationSeconds % 60) + "").padStart(2, "0")

    return `${minute}:${seconds}`
  }

  return (
    <SongListWrapper>
      <Table
        loading={!!!list.length}
        dataSource={list}
        pagination={{
          showSizeChanger: false,
          hideOnSinglePage: true,
          defaultPageSize: 20,
          onChange(page) {
            setCurrentPage(page)
          }
        }}
      >
        <Column
          title="序号"
          dataIndex="id"
          key="id"
          width={90}
          render={(_1, _2, index) => {
            return (currentPage - 1) * 20 + (index + 1)
          }}
        />

        <Column title="歌曲" dataIndex="name" key="name" />

        <Column
          title="歌手"
          dataIndex="ar"
          key="ar"
          render={(_, record) => {
            return record.ar[0].name
          }}
        />

        <Column
          title="时长"
          dataIndex="dt"
          render={(_, { dt }) => formatDuration(dt)}
          key="dt"
        />
      </Table>
    </SongListWrapper>
  )
}

export default memo(SongList)
