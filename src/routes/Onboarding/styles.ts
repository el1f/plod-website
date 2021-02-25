import { Card } from "@geist-ui/react";
import styled from "styled-components/macro";

export const Container = styled.div`
	margin: 0 auto;
	max-width: 680px;
	padding-bottom: 256px;
	padding-top: 32px;
	width: 100%;

	@media (max-width: 712px) {
		padding: 0 16px;
		padding-bottom: 128px;
		max-width: none;
	}
`;

export const AvatarCard = styled.div`
	align-items: center;
	display: grid;
	grid-gap: 24px;
	grid-template-columns: 128px 1fr;

	.avatar {
		font-size: 4rem;
	}
`;

export const CrewCard = styled(Card)`
	display: flex;
	flex-direction: column;
	text-align: center;

	.content {
		flex-grow: 1;
	}
`;

export const CrewCardActions = styled.div`
	display: flex;
	width: 100%;

	& > * {
		flex-basis: 50%;
		flex-grow: 1;
		flex-shrink: 0;
		text-align: left;
	}
`;
