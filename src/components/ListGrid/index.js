import styled from 'styled-components'

const ListGrid = styled.main`
  display: grid;
  grid-gap: 10px;
  padding: 16px;

  @media(min-width: 860px) {
    grid-template-areas: "profileArea listArea";
    grid-template-columns: 160px 1fr;
  }
`;

export default ListGrid;