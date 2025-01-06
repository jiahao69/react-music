import styled from "styled-components"

export const PlayerBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 72px;
  padding: 0 120px;
  margin: 0 auto;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

  .left-layout {
    display: flex;
    align-items: center;
    width: 460px;

    .song-pic {
      width: 70px;
      margin-right: 20px;
    }

    .song-info {
      margin-bottom: 11px;
      .name {
        font-size: 14px;
      }

      .singer {
        font-size: 14px;
        color: #666;
      }
    }

    .duration {
      font-size: 14px;
      color: #999;
    }
  }
`
