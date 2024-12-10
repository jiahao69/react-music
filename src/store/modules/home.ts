import { create } from "zustand"

import { getBanners, getRecommendedPlaylist } from "@/service/modules"

export const useHomeStore = create((set) => ({
  banners: [],
  recommendedPlaylist: [],
  async getBanners() {
    const { banners } = await getBanners()

    set({ banners })
  },

  async getRecommendedPlaylist(cat: string) {
    const { playlists } = await getRecommendedPlaylist({ cat })

    set({ recommendedPlaylist: playlists })
  }
}))
