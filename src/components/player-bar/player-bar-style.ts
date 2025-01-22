import styled from "styled-components"
import { motion } from "motion/react"

export const BarMotionWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 72px;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

  .player-bar-content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1400px;
    height: 100%;
    margin: 0 auto;
  }
`

export const BarLeftLayout = styled.div`
  display: flex;
  align-items: center;
  width: 460px;

  .album-pic {
    width: 70px;
    height: 70px;
    margin-right: 20px;
  }

  .header-layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-size: 14px;

    .song-info {
      display: flex;
      align-items: center;
      width: 280px;

      .name {
        max-width: 60%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .artist {
        max-width: 40%;
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .duration {
      color: #999;
    }
  }
`

export const BarMiddleLayout = styled.div`
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
  .next-btn,
  .play-btn {
    cursor: pointer;
  }

  .play-btn {
    margin: 0 31px;
  }
`

export const BarRightLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 460px;
  gap: 28px;

  .iconfont {
    font-size: 18px;
  }

  .play-mode-btn {
    cursor: pointer;
  }

  .playlist-btn {
    position: relative;
    cursor: pointer;

    .playlist-num {
      position: absolute;
      top: -4px;
      left: 12px;
      font-size: 12px;
    }
  }

  .volume-control {
    display: flex;
    align-items: center;
    cursor: pointer;

    .volume-progress {
      width: 86px;
      margin-left: 10px;
    }
  }
`
