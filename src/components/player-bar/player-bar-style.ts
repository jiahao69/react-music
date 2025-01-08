import styled from "styled-components"

export const PlayerBarWrapper = styled.div`
  .player-bar-wrapper {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 72px;
    padding: 0 120px;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

    .player-bar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1400px;
    }
  }

  .left-layout {
    display: flex;
    align-items: center;
    width: 460px;

    .ant-slider {
      margin: 0;
    }

    .song-pic {
      width: 70px;
      margin-right: 20px;
    }

    .song-info {
      .name {
        font-size: 14px;
      }

      .artist {
        font-size: 14px;
        color: #666;
      }
    }

    .duration {
      font-size: 14px;
      color: #999;
    }
  }

  .middle-layout {
    display: flex;
    align-items: center;

    .prev-btn .iconfont,
    .next-btn .iconfont {
      font-size: 24px;
    }

    .play-btn .iconfont {
      font-size: 40px;
    }

    .prev-btn,
    .play-btn,
    .next-btn {
      cursor: pointer;
    }

    .play-btn {
      margin: 0 31px;
    }
  }

  .right-layout {
    display: flex;
    width: 460px;
    gap: 28px;

    .like-btn .iconfont,
    .mode-btn .iconfont,
    .playlist-btn .iconfont {
      font-size: 18px;
    }

    .like-btn,
    .mode-btn,
    .playlist-btn {
      cursor: pointer;
    }
  }
`
