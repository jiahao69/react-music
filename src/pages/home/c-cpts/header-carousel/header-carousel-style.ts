import { styled } from "styled-components"

export const HeaderCarouselWrapper = styled.div`
  height: 364px;
  .carousel-wrapper {
    background-size: cover;

    .carousel-item {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 982px !important;
      cursor: pointer;
    }
  }
`
