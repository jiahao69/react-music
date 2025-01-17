import { styled } from "styled-components"

export const HeaderCarouselWrapper = styled.div`
  .carousel-wrapper {
    width: 1408px;
    height: 364px;
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
