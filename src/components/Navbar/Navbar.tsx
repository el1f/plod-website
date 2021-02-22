import { Button, Link } from "@geist-ui/react";
import React from "react";

import { DiscordIcon } from "../../config/icons";
import { Actions, Container } from "./styles";

interface NavbarProperties {
	onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProperties> = ({
	onLoginClick,
}: NavbarProperties) => {
	return (
		<Container>
			<Actions>
				<Link href="https://discord.gg/bp7ztg4AEz" target="_blank">
					<DiscordIcon />
				</Link>
				<Button size="small" type="secondary" ghost auto onClick={onLoginClick}>
					Login
				</Button>
			</Actions>
		</Container>
	);
};

export default Navbar;
