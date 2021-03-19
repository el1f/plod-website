import { Select, Text } from "@geist-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logos/white.svg";
import {
	Content,
	Copyright,
	Legal,
	Links,
	LogoWrapper,
	Trademark,
	Wrapper,
} from "./styles";

const Footer: React.FC = () => {
	const { t, i18n } = useTranslation();
	const languages = [
		["it-IT", "🇮🇹 Italiano"],
		["en-GB", "🇬🇧 English"],
	] as [code: string, label: string][];
	const handler = (value: string | string[]) => {
		if (typeof value !== "string") return;
		i18n.changeLanguage(value);
	};

	return (
		<Wrapper>
			<Content>
				<Trademark>
					{/* <LogoWrapper>
						<Logo />
						<Text h5>Padova Longboard</Text>
					</LogoWrapper> */}
					<Select value={i18n.language} placeholder="Lingua" onChange={handler}>
						{languages.map(([code, label]) => (
							<Select.Option key={code} value={code}>
								{label}
							</Select.Option>
						))}
					</Select>
				</Trademark>
				<Links>
					<Text h6>{t("footer.legalHeader")}</Text>
					<RouterLink to="/privacy">{t("footer.privacyPolicy")}</RouterLink>
				</Links>
				<Copyright>
					<Text>© {new Date().getFullYear()}</Text>
				</Copyright>
				<Legal></Legal>
			</Content>
		</Wrapper>
	);
};

export default Footer;
