import { darken } from "polished";
import styled from "styled-components/macro";

export const Bullet = styled.a<{ $color: string }>`
	background-color: ${({ $color }) => $color};
	border: none;
	border-radius: 50%;
	color: inherit;
	padding: 12px;
	transition: 200ms;

	svg {
		display: block;
		height: 1rem;
		width: 1rem;
	}

	&:hover {
		background-color: ${({ $color }) => darken(0.2, $color)};
	}
`;
