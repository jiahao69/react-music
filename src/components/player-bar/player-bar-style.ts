import styled from "styled-components"

export const PlayerBarWrapper = styled.div`
  .player-bar-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 72px;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

    .player-bar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1400px;
      margin: 0 auto;

      .bar-left-layout {
        display: flex;
        align-items: center;
        width: 460px;

        .album-pic {
          width: 70px;
          height: 70px;
          margin-right: 20px;
        }

        .right-layout {
          flex: 1;

          .header-layout {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 11px;

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
        }
      }

      .bar-middle-layout {
        display: flex;
        align-items: center;

        .prev-btn .iconfont,
        .next-btn .iconfont {
          font-size: 24px;
        }

        .play-btn .iconfont {
          font-size: 40px;
        }

        .play-btn {
          margin: 0 31px;
        }
      }

      .bar-right-layout {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 460px;
        gap: 28px;

        .iconfont {
          font-size: 18px;
        }

        .volume-control {
          display: flex;
          align-items: center;

          .volume-progress {
            width: 86px;
            margin-left: 10px;
          }
        }
      }
    }
  }
`
