import { Card } from "@geist-ui/react";
import styled from "styled-components/macro";

export const Layout = styled.div`
	box-sizing: border-box;
	margin: 0 auto;
	max-width: 1080px;
	width: 100%;

	* {
		box-sizing: border-box;
	}

	@media (max-width: 1128px) {
		padding: 0 24px;
		max-width: none;
		overflow-x: hidden;
	}
`;

export const EventsCarousel = styled.div`
	align-items: flex-start;
	display: flex;
	margin-left: calc((100vw - 1080px) / 2 * -1);
	margin-right: calc((100vw - 1080px) / 2 * -1);
	overflow-x: scroll;
	padding-bottom: 30px;
	padding-left: calc((100vw - 1080px) / 2);
	/* width: 100%; */
	width: calc(100% + ((100vw - 1080px) / 2) + ((100vw - 1080px) / 2));

	@media (max-width: 1080px) {
		margin-left: -24px;
		padding-left: 24px;
		margin-right: -24px;
		width: calc(100% + 48px);
	}

	&::after {
		content: "-";
		display: block;
		flex-shrink: 0;
		opacity: 0;
		width: calc((100vw - 1080px) / 2);

		@media (max-width: 1080px) {
			width: 0px;
		}
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

export const AlertCard = styled(Card)`
	text-align: center;

	& > * {
		margin: 0 auto;
		max-width: 512px;
	}
`;
