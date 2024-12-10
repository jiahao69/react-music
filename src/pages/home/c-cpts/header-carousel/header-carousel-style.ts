import { styled } from "styled-components"

export const HeaderCarouselWrapper = styled.div<{ $blurBg: string }>`
  height: 364px;
  background-image: url(${(props) => props.$blurBg});

  .carousel-item {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 982px !important;
    cursor: pointer;
  }
`
