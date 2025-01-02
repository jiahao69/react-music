import styled from "styled-components"

export const PlaylistDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 60px;

  .playlist-left-layout {
    width: 322px;

    .playlist-desc {
      margin-bottom: 10px;
      margin-top: 40px;
      font-size: 22px;
      font-weight: 600;
      line-height: 30px;
    }

    .playlist-desc-content {
      color: #666;
      font-size: 14px;
      line-height: 21px;
    }
  }

  .playlist-right-layout {
    width: 980px;

    .playlist-title {
      font-size: 30px;
      font-weight: 600;
    }

    .playlist-creator {
      display: flex;
      align-items: center;
      margin-top: 14px;

      .playlist-creator-avatar {
        margin-right: 10px;
      }

      .playlist-creator-name {
        color: #666;
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
`
