import { Button, Link } from "@geist-ui/react";
import React from "react";

import { DiscordIcon } from "../../config/icons";
import { Actions, Container } from "./styles";

const Navbar: React.FC = () => {
	return (
		<Container>
			<Actions>
				<Link href="https://discord.gg/bp7ztg4AEz" target="_blank">
					<DiscordIcon />
				</Link>
				<Button size="small" type="secondary" ghost auto>
					Login
				</Button>
			</Actions>
		</Container>
	);
};

export default Navbar;
