import styled from 'styled-components/macro';

export const Layout = styled.div`
    display: grid;
    height: 100vh;
    grid-template-rows: minmax(32px, 1fr) auto auto minmax(32px, 1fr);
    grid-row-gap: 32px;
`;

export const Body = styled.div`
  padding: 0 24px;
`;

export const Actions = styled.div`
    padding: 0 24px;
  display: grid;
  grid-gap: 12px; 
  max-width: 320px;
  margin: 0 auto;
  width: 100%;
`;