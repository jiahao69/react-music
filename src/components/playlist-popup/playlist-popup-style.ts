import styled from "styled-components"

export const PlaylistPopupWrapper = styled.div`
  position: absolute;
  bottom: 80px;
  right: 192px;
  width: 512px;
  height: 508px;
  padding: 34px 0 20px;
  overflow-y: scroll;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgba(65, 67, 70, 0.08);

  .playlist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 23px 0 25px;

    .playlist-text {
      font-weight: 600;
    }

    .playlist-num {
      font-size: 14px;
      font-weight: 300;
    }

    .clear-playlist {
      font-size: 14px;
      cursor: pointer;
    }
  }

  .playlist-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    padding: 0 25px;
    font-size: 14px;

    &:hover {
      background: hsla(0, 0%, 97%, 0.7);
    }

    .song-name {
      font-weight: 400;
      height: 20px;
      line-height: 20px;
      margin-right: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 198px;
    }

    .artist {
      font-weight: 400;
      height: 20px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 163px;
    }

    .duration {
      font-weight: 600;
    }
  }
`
