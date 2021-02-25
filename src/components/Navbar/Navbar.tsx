import { Avatar, Button, Link, Popover, Text } from "@geist-ui/react";
import { useGet } from "@typesaurus/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link as RouterLink } from "react-router-dom";
import { collection } from "typesaurus";

import { ReactComponent as Logo } from "../../assets/logos/white.svg";
import { auth } from "../../config/firebase";
import { DiscordIcon, InstagramIcon } from "../../config/icons";
import { FirestoreUser } from "../../typings/database/User";
import {
	ActionableContent,
	Actions,
	Container,
	Links,
	LogoContainer,
} from "./styles";

interface NavbarProperties {
	onLoginClick?: () => void;
	onLogoutClick?: () => void;
}

const users = collection<FirestoreUser>("users");

const Navbar: React.FC<NavbarProperties> = ({
	onLoginClick,
	onLogoutClick,
}: NavbarProperties) => {
	const [user, loading] = useAuthState(auth);
	const [profile] = useGet(users, auth.currentUser?.uid ?? "");

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
					<Link
						href="https://www.instagram.com/padova_longboard/"
						target="_blank"
					>
						<InstagramIcon />
					</Link>
					<Link href="https://discord.gg/bp7ztg4AEz" target="_blank">
						<DiscordIcon />
					</Link>
				</Actions>
				<Actions>
					{user && profile ? (
						<Popover
							placement="bottomEnd"
							content={
								<>
									<Popover.Item title>
										<Text
											span
										>{`${profile.data.firstName} ${profile.data.lastName}`}</Text>
									</Popover.Item>
									<Popover.Item>
										<Button type="secondary" onClick={onLogoutClick}>
											Logout
										</Button>
									</Popover.Item>
								</>
							}
						>
							<Avatar
								src={profile.data.photoUrl}
								text={profile.data.firstName[0]}
							/>
						</Popover>
					) : (
						<Button
							size="small"
							type="secondary"
							loading={loading}
							ghost
							auto
							onClick={onLoginClick}
						>
							Login
						</Button>
					)}
				</Actions>
			</ActionableContent>
		</Container>
	);
};

export default Navbar;
