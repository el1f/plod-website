import { Button, Link } from "@geist-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../config/firebase";
import { DiscordIcon } from "../../config/icons";
import { Actions, Container } from "./styles";

interface NavbarProperties {
	onLoginClick?: () => void;
}

const Navbar: React.FC<NavbarProperties> = ({
	onLoginClick,
}: NavbarProperties) => {
	const [user, loading] = useAuthState(auth);

	function onLogoutClick(): void {
		auth.signOut();
	}

	return (
		<Container>
			<Actions>
				<Link href="https://discord.gg/bp7ztg4AEz" target="_blank">
					<DiscordIcon />
				</Link>
				<Button
					size="small"
					type="secondary"
					loading={loading}
					ghost
					auto
					onClick={user ? onLogoutClick : onLoginClick}
				>
					{user ? "Logout" : "Login"}
				</Button>
			</Actions>
		</Container>
	);
};

export default Navbar;
