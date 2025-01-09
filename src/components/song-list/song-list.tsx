import { memo, useState } from "react"
import type { FC, ReactNode } from "react"
import { Table, ConfigProvider } from "antd"

import { SongListWrapper } from "./song-list-style"
import { getSongUrl } from "@/service/modules"
import { useHomeStore } from "@/store/modules"
import { formatDuration } from "@/utils/format-duration"

interface IProps {
  children?: ReactNode
  list: any[]
}

const { Column } = Table

const defaultPageSize = 20

const SongList: FC<IProps> = (props) => {
  const { list } = props

  const [currentPage, setCurrentPage] = useState(1)
  const [hoverRow, setHoverRow] = useState<any>({})
  const playIndex = useHomeStore((state) => state.playIndex)
  const playlist = useHomeStore((state) => state.playlist)
  const setPlaylist = useHomeStore((state) => state.setPlaylist)

  const currentPlay = playlist[playIndex]

  const handlePlay = async (record: any) => {
    const { id, al, name, ar, dt } = record

    const { data } = await getSongUrl({ id })

    const { url, time } = data[0]

    setPlaylist({
      id,
      picUrl: al.picUrl,
      name,
      artist: ar[0].name,
      duration: dt,
      playDuration: time,
      playUrl: url
    })
  }

  return (
    <SongListWrapper>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerColor: "#999",
              rowHoverBg: "#f5f5f5",
              borderColor: "transparent"
            }
          }
        }}
      >
        <Table
          rowKey="id"
          dataSource={list}
          loading={!!!list.length}
          rowClassName={(_, index) => ((index + 1) % 2 === 0 ? "even-row" : "")}
          pagination={{
            showSizeChanger: false,
            hideOnSinglePage: true,
            defaultPageSize,
            onChange(page) {
              document.body.scrollIntoView()

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
            title="序号"
            width={90}
            align="center"
            render={(_, _2, index) => (
              <span style={{ fontWeight: 700 }}>
                {(currentPage - 1) * defaultPageSize + (index + 1)}
              </span>
            )}
          />

          <Column
            title="歌曲"
            width={400}
            ellipsis
            render={(_, { id, name }) => (
              <span
                style={{
                  cursor: "pointer",
                  fontWeight: currentPlay?.id === id ? 600 : "normal"
                }}
              >
                {name}
              </span>
            )}
          />

          <Column
            title="歌手"
            width={340}
            ellipsis
            render={(_, { ar }) => (
              <span style={{ color: "#666", cursor: "pointer" }}>
                {ar[0].name}
              </span>
            )}
          />

          <Column
            title="时长"
            render={(_, record) =>
              hoverRow.id === record.id ? (
                <div className="operate-btns">
                  <i
                    className="iconfont icon-icon_play"
                    onClick={() => handlePlay(record)}
                  ></i>

                  <i className="iconfont icon-playlist_icon_add"></i>

                  <i className="iconfont icon-bar_icon_heart"></i>
                </div>
              ) : (
                <span style={{ color: "#666" }}>
                  {formatDuration(record.dt)}
                </span>
              )
            }
          />
        </Table>
      </ConfigProvider>
    </SongListWrapper>
  )
}

export default memo(SongList)
