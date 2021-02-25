import { Button, Link } from "@geist-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link as RouterLink } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logos/white.svg";
import { auth } from "../../config/firebase";
import { DiscordIcon, InstagramIcon } from "../../config/icons";
import {
	ActionableContent,
	Actions,
	Container,
	Links,
	LogoContainer,
} from "./styles";

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
			<RouterLink to="/">
				<LogoContainer>
					<Logo />
					<Logo />
				</LogoContainer>
			</RouterLink>
			<ActionableContent>
				<Links>
					<RouterLink to="/events">Events</RouterLink>
				</Links>
				<Actions>
					<Link href="https://discord.gg/bp7ztg4AEz" target="_blank">
						<InstagramIcon />
					</Link>
					<Link href="https://discord.gg/bp7ztg4AEz" target="_blank">
						<DiscordIcon />
					</Link>
				</Actions>
				<Actions>
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
			</ActionableContent>
		</Container>
	);
};

export default Navbar;
