import styled from "styled-components"

export const PlaylistsWrapper = styled.div`
  .playlists {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 48px;
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
