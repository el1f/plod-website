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

export const ActionableContent = styled.div`
	align-items: center;
	display: flex;
	margin-left: auto;

	& > *:not(:first-child) {
		margin-left: 16px;

		&::before {
			content: "•";
		}
	}
`;

export const Actions = styled.div`
	align-items: center;
	display: grid;
	grid-auto-flow: column;
	grid-gap: 12px;

	a {
		opacity: 0.5;
		padding: 4px;
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

export const Links = styled.div`
	a {
		color: inherit;
		opacity: 0.5;

		&:hover {
			opacity: 1;
		}
	}
`;
