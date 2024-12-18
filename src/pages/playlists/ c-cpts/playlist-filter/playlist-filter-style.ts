import styled from "styled-components"

export const PlaylistsFilterWrapper = styled.div`
  margin-bottom: 28px;
  margin-top: 38px;

  .current-catetory {
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: 22px;
    font-weight: 600;
    line-height: 30px;
    cursor: pointer;

    .current-catetory-name {
      margin-right: 8px;
    }
  }

  .catetory-panel {
    position: absolute;
    height: 600px;
    width: 900px;
    margin-top: 10px;
    padding: 30px 10px 10px 36px;
    background: #fff;
    box-shadow: 0 4px 20px 0 rgba(65, 67, 70, 0.08);
    z-index: 10;
    overflow-y: scroll;

    .catetory-item {
      .catetory-name {
        margin-left: 2px;
        margin-bottom: 16px;
        font-size: 14px;
        font-weight: 600;
      }

      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }

    .catetory-detail-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .catetory-detail-item {
        padding: 6px 18px;
        background: #f7f7f7;
        border-radius: 16px;
        color: #000;
        font-size: 14px;
        font-weight: 300;
        cursor: pointer;

        &:hover {
          background: #ffe12c;
        }

        &.active {
          background: #ffe12c;
        }
      }
    }
  }
`
