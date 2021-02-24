import styled from "styled-components/macro";

export const Layout = styled.div`
	margin: 0 auto;
	max-width: 1080px;
	width: 100%;
`;

export const EventsCarousel = styled.div`
	align-items: flex-start;
	display: flex;
	margin-left: calc((100vw - 1080px) / 2 * -1);
	margin-right: calc((100vw - 1080px) / 2 * -1);
	overflow-x: scroll;
	padding-bottom: 30px;
	padding-left: calc((100vw - 1080px) / 2);

	&::after {
		content: "-";
		display: block;
		flex-shrink: 0;
		opacity: 0;
		width: calc((100vw - 1080px) / 2);
	}

	&::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	/* Track */
	&::-webkit-scrollbar-track {
		background: transparent;
	}

	/* Handle */
	&::-webkit-scrollbar-thumb {
		background: ${({ theme }) => theme.palette.foreground};
	}

	/* Handle on hover */
	&::-webkit-scrollbar-thumb:hover {
		background: ${({ theme }) => theme.palette.accents_6};
	}

	& > * {
		margin-right: 24px;
	}
`;
