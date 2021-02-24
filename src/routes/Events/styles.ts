import styled from "styled-components/macro";

export const Layout = styled.div`
	margin: 0 auto;
	max-width: 1080px;
	width: 100%;
`;

export const EventsCarousel = styled.div`
	display: flex;

	& > * {
		margin-right: 24px;
	}
`;
