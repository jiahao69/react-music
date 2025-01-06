import { styled } from "styled-components"

export const SearchInputWrapper = styled.div`
  .search-input-wrapper {
    position: relative;

    .search-input {
      width: 294px;
      height: 34px;
      padding-left: 34px;
      padding-right: 24px;
      border: none;
      outline: none;
      background-color: #f5f5f5;
      font-size: 14px;

      &::placeholder {
        font-size: 14px;
      }
    }

    .search-icon {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: rgb(156, 156, 156);
    }
  }

  .hot-search-wrapper {
    position: absolute;
    width: 294px;
    min-height: 300px;
    padding: 18px 0 15px;
    border-radius: 4px;
    box-shadow: 0 10px 30px 0 rgba(65, 67, 70, 0.08);
    background-color: #fff;
    z-index: 1;

    .hot-search-title {
      padding-left: 18px;
      margin-bottom: 8px;
      font-size: 16px;
    }
  }
`
