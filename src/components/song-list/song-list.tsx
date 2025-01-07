import { memo, useState } from "react"
import type { FC, ReactNode } from "react"
import { Table, ConfigProvider } from "antd"

import { SongListWrapper } from "./song-list-style"
import { AudioManage } from "@/manage/audio-manage"
import { getSongUrl } from "@/service/modules"
import { useHomeStore } from "@/store/modules"

interface IProps {
  children?: ReactNode
  list: any[]
}

const { Column } = Table

const audioManege = new AudioManage()

const SongList: FC<IProps> = (props) => {
  const { list } = props

  const [currentPage, setCurrentPage] = useState(1)
  const [hoverRow, setHoverRow] = useState<any>({})
  const setPlaylists = useHomeStore((state) => state.setPlaylists)

  const formatDuration = (duration: number) => {
    const durationSeconds = duration / 1000

    const minute = (Math.floor(durationSeconds / 60) + "").padStart(2, "0")

    const seconds = (Math.round(durationSeconds % 60) + "").padStart(2, "0")

    return `${minute}:${seconds}`
  }

  const handlePlay = async (record: any) => {
    const { id, al, name, ar, dt } = record

    setPlaylists({
      id,
      picUrl: al.picUrl,
      name,
      singer: ar[0].name,
      duration: dt
    })

    const { data } = await getSongUrl({ id })

    const url = data[0].url

    audioManege.play(url)
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
            title="序号"
            width={90}
            align="center"
            render={(_, _1, index) => (
              <span style={{ fontWeight: 700 }}>
                {(currentPage - 1) * 20 + (index + 1)}
              </span>
            )}
          />

          <Column
            title="歌曲"
            width={400}
            ellipsis
            render={(_, { name }) => (
              <span style={{ cursor: "pointer" }}>{name}</span>
            )}
          />

          <Column
            title="歌手"
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
