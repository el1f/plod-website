import React from "react";

import { SocialIcons } from "../../config/icons";
import SocialColors from "../../helpers/constants/SocialColors";
import { SupportedSocial } from "../../typings/SupportedSocial";
import { Bullet } from "./styles";

export interface SocialShareButtonProperties {
	social: SupportedSocial;
	target: string;
}

const SocialShareButton: React.FC<SocialShareButtonProperties> = ({
	social,
	target,
}: SocialShareButtonProperties) => {
	const icon = SocialIcons[social];
	const color = SocialColors[social];

	return (
		<Bullet $color={color} href={target} target="_blank">
			{icon}
		</Bullet>
	);
};

export default SocialShareButton;