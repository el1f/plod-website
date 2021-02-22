import styled from "styled-components/macro";

export const Chip = styled.a`
	border-radius: 12px;
	color: inherit;
	display: flex;
	padding: 6px 16px 6px 8px;
	transition: 0.1s;

	&:hover {
		background-color: ${({ theme }) => theme.palette.accents_2};
	}
`;

export const Avatar = styled.div`
	background-color: ${({ theme }) => theme.palette.foreground};
	border-radius: 40%;
	color: ${({ theme }) => theme.palette.background};
	height: 24px;
	margin-right: 12px;
	padding: 4px;
	width: 24px;

	svg {
		display: block;
		height: 16px;
		width: 16px;
	}
`;
