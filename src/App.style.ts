import { styled } from "styled-components"

export const AppWrapper = styled.div`
  .app-content {
    padding: 0 256px;
    padding-bottom: 60px;

    .nav-bar-wrapper {
      padding: 16px 0;
      padding-left: 206px;

      .nav-item {
        position: relative;
        color: #333;
        font-size: 14px;
        text-decoration: none;

        &:not(:last-child) {
          margin-right: 34px;
        }

        &.active {
          font-weight: 600;
        }

        &.active::after {
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
    }
  }
`
