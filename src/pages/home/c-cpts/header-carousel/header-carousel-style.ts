import { styled } from "styled-components"

export const HeaderCarouselWrapper = styled.div`
  /* 给最外层容器一个高度，防止首次加载时后面的页面内容覆盖 */
  height: 364px;

  .carousel-wrapper {
    background-size: cover;

    .carousel-item {
      width: 982px;
      height: 364px;
      margin: 0 auto;
    }
  }
`
