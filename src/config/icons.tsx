import React from "react";
import {
	FaDiscord as DiscordIcon,
	FaFacebookF as FacebookIcon,
	FaInstagram as InstagramIcon,
	FaTelegramPlane as TelegramIcon,
	FaWhatsapp as WhatsappIcon,
} from "react-icons/fa";

export { FiShare2 as ShareIcon, FiCopy as CopyIcon } from "react-icons/fi";

export const SocialIcons = {
	discord: <DiscordIcon />,
	instagram: <InstagramIcon />,
	telegram: <TelegramIcon />,
	whatsapp: <WhatsappIcon />,
	facebook: <FacebookIcon />,
} as const;

export { DiscordIcon, InstagramIcon, TelegramIcon, WhatsappIcon, FacebookIcon };
