import styled from "styled-components/macro";

export const Wrapper = styled.div`
	background: linear-gradient(0deg, #080808 0%, #131313 100%);
	border: 2px solid #333;
	border-radius: 24px;
	display: flex;
	flex-direction: column;
	min-width: 384px;
	overflow: visible;

	p {
		margin: 0;
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

export const Location = styled.div`
	align-items: center;
	background-color: #333333;
	border-radius: 12px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	height: 36px;
	justify-content: flex-start;
	margin-right: auto;
	overflow: visible;
	padding: 8px 12px 8px 8px;

	svg {
		height: 1.25rem;
		margin-right: 8px;
		width: 1.25rem;
	}
`;

export const Date = styled.div`
	background: linear-gradient(135deg, red 0%, cyan 100%);
	border-radius: 12px;
	display: flex;
	height: 100%;
	overflow: visible;
	padding: 2px;
`;

export const DateHour = styled.div`
	align-items: center;
	background-color: #131313;
	border-radius: 10px 0px 0px 10px;
	display: flex;
	justify-content: center;
	padding: 0 12px;
`;

export const DateDay = styled.div`
	align-items: center;
	background-color: #131313;
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
	}
`;

export const Actions = styled.div`
	button {
		//TODO: there has to bea a cleaner way!
		width: 100% !important;
	}
`;
