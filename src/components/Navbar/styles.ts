import styled from "styled-components/macro";

export const Container = styled.div`
	align-items: center;
	display: flex;
	grid-auto-flow: column;
	margin: 0 auto;
	max-width: 1080px;
	padding: 0 16px;
	width: 100%;
`;

export const Actions = styled.div`
	align-items: center;
	display: grid;
	grid-auto-flow: column;
	grid-gap: 12px;
	margin-left: auto;

	a {
		opacity: 0.5;
		padding: 8px;
		transition: 200ms;

		& > svg {
			height: 1.5rem;
			width: 1.5rem;
		}

		&:hover {
			opacity: 1;
		}
	}
`;
