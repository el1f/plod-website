import styled from "styled-components/macro";

export const Layout = styled.div`
	box-sizing: border-box;
	display: grid;
	grid-row-gap: 32px;
	grid-template-rows: 80px 1fr;
	height: 100vh;
`;

export const Body = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;

	img {
		height: 320px;
		margin-top: -80px;
		max-height: 50vw;
		max-width: 50vw;
		width: 320px;
	}
`;
