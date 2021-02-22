import Tilt from "react-parallax-tilt";
import styled from "styled-components/macro";

export const TiltWrapper = styled(Tilt)`
	margin: 0 auto;
	max-width: 320px;
	transform-style: preserve-3d;
	width: 100%;
`;

export const Card = styled.div`
	background: linear-gradient(135deg, #00ffff 0%, hsl(0, 100%, 47%) 100%);
	border-radius: 16px;
	box-sizing: border-box;
	padding: 12px;
	position: relative;
	transform: translateZ(20px);
	transform-style: preserve-3d;
	width: 100%;

	* {
		box-sizing: border-box;
	}
`;

export const Content = styled.div`
	background: linear-gradient(0deg, #111 0%, #000000 100%);
	border-radius: 8px;
	box-shadow: 0px 2px 12px -4px #000000;
	overflow: hidden;
	overflow: hidden;
	padding: 64px 16px 32px;
	position: relative;
	transform: translateZ(8px);
	transform-style: preserve-3d;
`;

export const Decoration = styled.div`
	height: 256px;
	left: -64px;
	opacity: 0.125;
	position: absolute;
	top: -64px;
	width: 256px;

	img {
		object-fit: contain;
	}
`;

export const Header = styled.div`
	position: relative;

	hgroup {
		line-height: 1;
		margin-top: 24px;
		text-align: center;

		* {
			margin: 0;
		}
	}
`;

export const Groups = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	small {
		display: block;
		margin: 0 4px;
		opacity: 0.5;
	}
`;

export const PhotoBox = styled.figure`
	height: 128px;
	margin: 0 auto;
	position: relative;
	width: 128px;
`;

export const Avatar = styled.img`
	border-radius: 50%;
	height: 100%;
	width: 100%;
`;

export const CrewPic = styled.div`
	border-radius: 50%;
	bottom: -4px;
	box-shadow: 0 0 0 4px #060606;
	height: 40px;
	position: absolute;
	right: -4px;
	width: 40px;
`;

export const Handles = styled.div`
	align-items: center;
	display: grid;
	justify-content: center;
	margin-top: 24px;
	transform: translateZ(16px);
`;
