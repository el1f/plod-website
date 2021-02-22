import styled from "styled-components/macro";

export const Layout = styled.div`
	box-sizing: border-box;
	display: grid;
	grid-row-gap: 32px;
	grid-template-rows: minmax(32px, 1fr) auto auto minmax(32px, 1fr);
	height: 100vh;
`;

export const Body = styled.div`
	padding: 0 24px;
`;

export const Actions = styled.div`
	display: grid;
	grid-gap: 12px;
	margin: 0 auto;
	max-width: 320px;
	padding: 0 24px;
	width: 100%;
`;
