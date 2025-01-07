import styled from "styled-components"

export const HomeWrapper = styled.div`
  .playlist-wrapper {
    .playlist-header {
      display: flex;
      align-items: center;
      margin-top: 70px;
      margin-bottom: 28px;

      .playlist-header-title {
        margin-right: 40px;
        font-size: 28px;
      }

      .more-btn {
        display: flex;
        align-items: center;
        margin-left: 34px;
        color: #999;
        font-size: 13px;
        cursor: pointer;
      }
    }

    .playlists {
      display: flex;
      justify-content: space-between;
    }
  }

  .rankings-wrapper {
    .rankings-header {
      display: flex;
      align-items: center;
      margin-top: 70px;
      margin-bottom: 28px;

      .rankings-header-title {
        margin-right: 40px;
        font-size: 28px;
      }

      .more-btn {
        display: flex;
        align-items: center;
        color: #999;
        font-size: 13px;
        cursor: pointer;
      }
    }
  }
`
