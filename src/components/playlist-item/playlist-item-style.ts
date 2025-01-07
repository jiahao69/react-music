import styled from "styled-components"

export const PlaylistItemWrapper = styled.div`
  width: 264px;

  &:hover {
    .playlist-pic {
      transform: scale(1.1);
    }

    .playlist-pic-mask {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .playlist-pic-wrapper {
    position: relative;
    height: 264px;
    overflow: hidden;
    cursor: pointer;

    &:hover .play-btn {
      display: flex !important;
    }

    .playlist-pic {
      width: 264px;
      height: 264px;
      transition: transform 0.75s cubic-bezier(0, 1, 0.75, 1);
    }

    .playlist-pic-mask {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 0.2s ease-in-out;

      .play-btn {
        display: none;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 66px;
        border-radius: 50%;
        background-color: #fff;

        .iconfont {
          font-size: 30px;
        }
      }
    }
  }

  .playlist-title {
    margin-top: 16px;
    font-size: 16px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
      font-weight: bolder;
    }
  }

  .play-count-wrapper {
    display: flex;
    align-items: center;
    margin-top: 12px;
    color: #999;

    .play-count {
      margin-left: 2px;
      font-size: 14px;
    }
  }
`
