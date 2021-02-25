import styled from "styled-components/macro";

export const Wrapper = styled.div`
	border: 2px solid ${({ theme }) => theme.palette.accents_2};
	border-radius: 24px;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	max-width: calc(100vw - 48px);
	overflow: visible;
	width: 384px;

	p {
		margin: 0;
	}

	/* Skeletons */
	.text-row {
		border-radius: 8px;
	}
`;

export const Header = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	height: 80px;
	justify-content: space-between;
	padding: 16px;
`;

export const Location = styled.a`
	align-items: center;
	background-color: ${({ theme }) => theme.palette.accents_2};
	border-radius: 12px;
	box-sizing: border-box;
	color: inherit;
	display: flex;

	flex-direction: row;
	flex-shrink: 1;
	height: 36px;
	justify-content: flex-start;
	overflow: hidden;
	padding: 8px 12px 8px 8px;

	svg,
	.round-shape {
		flex-shrink: 0;
		height: 1.25rem;
		margin-right: 8px;
		width: 1.25rem;
	}

	span {
		display: block;
		flex-basis: 0;
		flex-grow: 1;
		flex-shrink: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&:hover {
		background-color: ${({ theme }) => theme.palette.accents_3};
	}
`;

export const Date = styled.div`
	background: linear-gradient(135deg, red 0%, cyan 100%);
	border-radius: 12px;
	display: flex;
	flex-shrink: 0;
	height: 100%;
	margin-left: 16px;
	min-width: 44px;
	overflow: visible;
	padding: 2px;
`;

export const DateHour = styled.div`
	align-items: center;
	background-color: ${({ theme }) => theme.palette.background};
	border-radius: 10px 0px 0px 10px;
	display: flex;
	justify-content: center;
	padding: 0 12px;
`;

export const DateDay = styled.div`
	align-items: center;
	background-color: ${({ theme }) => theme.palette.background};
	border-radius: 0px 10px 10px 0px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 2px;
	padding: 0 12px;

	& > * {
		line-height: 1.2;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	padding: 16px;
	padding-top: 0;
`;

export const Cover = styled.div`
	aspect-ratio: 4 / 3;
	background-color: ${({ theme }) => theme.palette.accents_2};
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 8px;
	margin-bottom: 20px;
	overflow: hidden;
	position: relative;
	width: 100%;

	img {
		display: block;
		height: 100%;
		object-fit: cover;
		width: 100%;
	}
`;

export const Categories = styled.div`
	align-items: center;
	bottom: 0;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	padding: 8px;
	position: absolute;
	right: 0;

	& > * {
		margin-left: 8px;
	}
`;

export const PartecipantGroup = styled.div`
	margin-bottom: 16px;

	.avatar-group {
		padding-left: 0.625rem;

		& > .avatar {
			background-color: ${({ theme }) => theme.palette.accents_2};
		}
	}
`;

export const Actions = styled.div`
	button {
		//TODO: there has to bea a cleaner way!
		width: 100% !important;
	}
`;
