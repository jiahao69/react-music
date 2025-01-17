import { memo } from "react"
import type { FC, ReactNode } from "react"
import { Carousel } from "antd"

import { HeaderCarouselWrapper } from "./header-carousel-style"

interface IProps {
  children?: ReactNode
  banners: Array<{ imageUrl: string; url: string }>
}

const HeaderCarousel: FC<IProps> = (props) => {
  const { banners } = props

  return (
    <HeaderCarouselWrapper>
      <Carousel autoplay fade>
        {banners.map((item, index) => (
          <div key={index}>
            <div
              className="carousel-wrapper"
              style={{
                backgroundImage: `url(${item.imageUrl}?imageView&blur=40x20)`
              }}
            >
              <div
                className="carousel-item"
                onClick={() => {
                  item.url && (location.href = item.url)
                }}
              >
                <img src={item.imageUrl} alt="" />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </HeaderCarouselWrapper>
  )
}

export default memo(HeaderCarousel)
