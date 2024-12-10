import { memo, useState, useEffect } from "react"
import type { FC, ReactNode } from "react"
import { Carousel } from "antd"

import { HeaderCarouselWrapper } from "./header-carousel-style"

interface IProps {
  children?: ReactNode
  banners: Array<{ imageUrl: string; url: string }>
}

const HeaderCarousel: FC<IProps> = (props) => {
  const { banners } = props

  const [blurBg, setBlurBg] = useState("")

  useEffect(() => {
    if (!banners.length) return

    const imageUrl = banners[0].imageUrl

    setBlurBg(`${imageUrl}?imageView&blur=40x20`)
  }, [banners])

  const handleBeforeChange = (_: number, next: number) => {
    const imageUrl = banners[next].imageUrl

    setBlurBg(`${imageUrl}?imageView&blur=40x20`)
  }

  return (
    <HeaderCarouselWrapper $blurBg={blurBg}>
      <Carousel arrows autoplay fade beforeChange={handleBeforeChange}>
        {banners.map((item, index) => (
          <div
            className="carousel-item"
            key={index}
            onClick={() => {
              item.url && (location.href = item.url)
            }}
          >
            <img src={item.imageUrl} alt="" />
          </div>
        ))}
      </Carousel>
    </HeaderCarouselWrapper>
  )
}

export default memo(HeaderCarousel)
