import { useHomeStore } from "@/store/modules"
import { getSongUrl } from "@/service/modules"
import { moveArrayElementToFisrt } from "@/utils/array-tools"
import type { IPlaylist } from "@/store/modules"

export function usePlayMusic(currentPlay: IPlaylist) {
  const setPlaylist = useHomeStore((state) => state.setPlaylist)
  const playlist = useHomeStore((state) => state.playlist)

  /**
   * 播放单首歌曲
   */
  const handleSigleSongPlay = async (record: any) => {
    const { id, al, name, ar, dt } = record

    // 该歌曲正在播放中
    if (currentPlay?.id === id) return

    // 该歌曲已在播放列表中
    if (playlist.map((item) => item.id).includes(id)) {
      // 移动该歌曲到播放列表首位
      const newPlaylist = moveArrayElementToFisrt<IPlaylist>(
        playlist,
        (item) => item.id === id
      )

      setPlaylist(newPlaylist)

      return
    }

    // 获取歌曲URL和实际播放时间
    const { data } = await getSongUrl({ id })
    const { url, time } = data[0]

    const newRecord = [
      {
        id,
        picUrl: al.picUrl,
        name,
        artist: ar[0].name,
        duration: dt,
        playDuration: time,
        playUrl: url
      }
    ]

    setPlaylist(newRecord, false)
  }

  /**
   * 播放歌单歌曲
   */
  const handlePlaylistPlay = () => {}

  return { handleSigleSongPlay }
}
