import React from "react";
import {
	FaDiscord as DiscordIcon,
	FaInstagram as InstagramIcon,
	FaTelegramPlane as TelegramIcon,
} from "react-icons/fa";

export const SocialIcons = {
	discord: <DiscordIcon />,
	instagram: <InstagramIcon />,
	telegram: <TelegramIcon />,
} as const;

export type SupportedSocial = "discord" | "instagram" | "telegram";

export { DiscordIcon, InstagramIcon, TelegramIcon };
