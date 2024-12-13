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

    &:hover .play-icon {
      display: block !important;
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

      .play-icon {
        display: none;
        color: #fff;
        font-size: 60px;
      }
    }
  }

  .playlist-title {
    margin-top: 16px;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      font-weight: bolder;
    }
  }

  .playlist-count {
    margin-top: 10px;
    color: #999;
    font-size: 14px;
  }
`
