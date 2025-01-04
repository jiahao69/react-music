import { memo, useState } from "react"
import type { FC, ReactNode } from "react"
import { Table, ConfigProvider } from "antd"

import { SongListWrapper } from "./song-list-style"
import { getImg } from "@/utils/files"

interface IProps {
  children?: ReactNode
  list: any[]
}

const { Column } = Table

const SongList: FC<IProps> = (props) => {
  const { list } = props

  const [currentPage, setCurrentPage] = useState(1)
  const [hoverRow, setHoverRow] = useState<any>({})

  const formatDuration = (duration: number) => {
    const durationSeconds = duration / 1000

    const minute = (Math.floor(durationSeconds / 60) + "").padStart(2, "0")

    const seconds = (Math.round(durationSeconds % 60) + "").padStart(2, "0")

    return `${minute}:${seconds}`
  }

  return (
    <SongListWrapper>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerColor: "#999",
              rowHoverBg: "#f5f5f5"
            }
          }
        }}
      >
        <Table
          rowKey="id"
          dataSource={list}
          rowClassName={(_, index) => ((index + 1) % 2 === 0 ? "even-row" : "")}
          pagination={{
            showSizeChanger: false,
            hideOnSinglePage: true,
            defaultPageSize: 20,
            onChange(page) {
              setCurrentPage(page)
            }
          }}
          onRow={(record) => ({
            // 鼠标移入行
            onMouseEnter() {
              setHoverRow(record)
            },
            // 鼠标移出行
            onMouseLeave() {
              setHoverRow({})
            }
          })}
        >
          <Column
            className="serial-number"
            title="序号"
            width={90}
            align="center"
            render={(_, _1, index) => (currentPage - 1) * 20 + (index + 1)}
          />

          <Column
            title="歌曲"
            render={(_, { name }) => <span className="song">{name}</span>}
          />

          <Column
            title="歌手"
            render={(_, { ar }) => <span className="singer">{ar[0].name}</span>}
          />

          <Column
            className="duration"
            title="时长"
            render={(_, { id, dt }) =>
              hoverRow.id === id ? (
                <div>
                  <img
                    style={{ width: "21px", cursor: "pointer" }}
                    src={getImg("mage--play")}
                    alt=""
                  />
                </div>
              ) : (
                formatDuration(dt)
              )
            }
          />
        </Table>
      </ConfigProvider>
    </SongListWrapper>
  )
}

export default memo(SongList)
