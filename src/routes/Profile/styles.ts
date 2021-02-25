import styled from "styled-components/macro";

export const Layout = styled.div`
	box-sizing: border-box;
	display: grid;
	grid-row-gap: 32px;
	grid-template-rows: minmax(32px, 1fr) auto auto minmax(32px, 1fr);
	height: calc(100vh - 80px);
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

export const SharePanel = styled.div`
	display: grid;
`;

export const AvailableSocials = styled.div`
	display: grid;
	grid-column-gap: 8px;
	grid-template-columns: repeat(auto-fit, 40px);
	justify-content: center;
	margin-bottom: 24px;
`;
