import { styled } from "styled-components"

export const NavBarWrapper = styled.div`
  display: flex;
  gap: 34px;

  .nav-item {
    position: relative;
    color: #333;
    font-size: 14px;
    cursor: pointer;

    &.nav-item--active::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 1px;
      width: 100%;
      height: 6px;
      background: #ffe443;
      z-index: -1;
    }
  }
`
