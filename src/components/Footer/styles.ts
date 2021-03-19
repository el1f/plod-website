import styled from "styled-components/macro";

export const Wrapper = styled.footer`
	border-top: 1px solid ${({ theme }) => theme.palette.accents_1};
	padding-bottom: 24px;

	a {
		color: inherit;
	}

	p {
		margin: 0;
	}
`;

export const Content = styled.div`
	display: grid;
	grid-gap: 24px;
	grid-template-areas: "trademark links" "copyright legal";
	grid-template-columns: 1fr 3fr min-content;
	grid-template-rows: 128px auto;
	margin: 0 auto;
	max-width: 1080px;
	padding-top: 32px;

	@media (max-width: 1080px) {
		padding: 32px 16px 0;
		grid-template-columns: 1fr;
		grid-template-areas: "trademark" "links" "copyright";
		grid-template-rows: auto auto auto;
	}
`;

export const Trademark = styled.div`
	grid-area: trademark;

	svg {
		display: block;
		height: 64px;
	}
`;

export const LogoWrapper = styled.div`
	align-items: center;
	display: flex;
	margin-bottom: 8px;

	img,
	svg {
		margin-right: 4px;
	}

	h5 {
		margin: 0;
	}
`;

export const Links = styled.div`
	grid-area: links;
	justify-self: flex-end;

	h6 {
		opacity: 0.5;
	}

	@media (max-width: 1080px) {
		justify-self: flex-start;
	}
`;

export const Copyright = styled.div`
	align-self: center;
	grid-area: copyright;
	opacity: 0.5;
`;

export const Legal = styled.div`
	align-self: center;
	grid-area: legal;
	justify-self: flex-end;
`;
