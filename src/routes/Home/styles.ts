import styled from "styled-components/macro";

export const Layout = styled.div`
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

export const Main = styled.main`
	align-items: center;
	display: flex;
	justify-content: center;
	min-height: calc(100vh - 80px);
`;
