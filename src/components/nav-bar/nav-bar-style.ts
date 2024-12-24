import { styled } from "styled-components"

export const NavBarWrapper = styled.div`
  display: flex;
  gap: 34px;
  width: fit-content;

  .nav-item {
    position: relative;
    color: #333;
    font-size: 14px;
    text-decoration: none;
    cursor: pointer;

    &.active,
    &.nav-item--active {
      font-weight: 600;
    }

    &.active::after,
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
