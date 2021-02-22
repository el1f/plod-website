import { Text } from "@geist-ui/react";
import React from "react";

import WhiteLogo from "../../assets/logos/white.svg";
import { SocialIcons } from "../../config/icons";
import { SupportedSocial } from "../../typings/SupportedSocial";
import HandleChip from "../HandleChip";
import {
	Avatar,
	Card,
	Content,
	CrewPic,
	Decoration,
	Groups,
	Handles,
	Header,
	PhotoBox,
	TiltWrapper,
} from "./styles";

interface ProfileCardProperties {
	name: string;
	photo: string;
	groups?: string[];
	mainGroup?: {
		name: string;
		logo: string;
	};
	links?: {
		icon: SupportedSocial;
		handle: string;
		target: string;
	}[];
}

const ProfileCard: React.FC<ProfileCardProperties> = ({
	name,
	photo,
	groups,
	mainGroup,
	links,
}: ProfileCardProperties) => {
	return (
		<TiltWrapper gyroscope={true} scale={1.05} perspective={1000} tiltReverse>
			<Card>
				<Content>
					<Decoration>
						<img src={WhiteLogo} alt="" />
					</Decoration>
					<Header>
						<PhotoBox>
							<Avatar src={photo} />
							{mainGroup && (
								<CrewPic>
									<Avatar src={mainGroup.logo} alt={mainGroup.name} />
								</CrewPic>
							)}
						</PhotoBox>
						<hgroup>
							<Text h1 size="1.5rem">
								{name}
							</Text>
							<Groups>
								{groups?.map((group) => (
									<Text key={group} small>
										{group}
									</Text>
								))}
							</Groups>
						</hgroup>
					</Header>
					{links && (
						<Handles>
							{links.map((link) => (
								<HandleChip
									key={link.target}
									icon={SocialIcons[link.icon]}
									value={link.handle}
									href={link.target}
								/>
							))}
						</Handles>
					)}
				</Content>
			</Card>
		</TiltWrapper>
	);
};

export default ProfileCard;
