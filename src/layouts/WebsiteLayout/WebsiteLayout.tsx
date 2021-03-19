import {
	Button,
	Input,
	Modal,
	Spacer,
	useInput,
	useModal,
	useToasts,
} from "@geist-ui/react";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import Footer from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { analytics, auth } from "../../config/firebase";
import { AuthForm, Layout } from "./styles";

export interface WebsiteLayoutProperties {
	children: JSX.Element | JSX.Element[];
}

const WebsiteLayout: React.FC<WebsiteLayoutProperties> = ({
	children,
}: WebsiteLayoutProperties) => {
	const { t } = useTranslation();
	const [isSignin, setIsSignin] = useState(true);
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [, setToast] = useToasts();
	const { setVisible, bindings } = useModal();
	const { state: email, bindings: emailBindings } = useInput("");
	const { state: pwd, bindings: pwdBindings } = useInput("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSigningIn(true);

		if (isSignin) {
			try {
				await auth.signInWithEmailAndPassword(email, pwd);

				setToast({
					type: "success",
					text: t("navbar.notifications.info.login"),
				});
			} catch {
				setToast({
					type: "error",
					text: t("navbar.notifications.error.login"),
				});
			}
		} else {
			try {
				analytics.logEvent("sign_up_create_user", {
					email,
					timestamp: new Date().toISOString(),
				});

				await auth.createUserWithEmailAndPassword(email, pwd);

				setToast({
					type: "success",
					text: t("navbar.notifications.info.welcome"),
				});
			} catch {
				setToast({
					type: "error",
					text: t("navbar.notifications.error.signup"),
				});
			}
		}

		setIsSigningIn(false);
		setVisible(false);
	}

	async function handleLogout() {
		await auth.signOut();

		setToast({
			type: "success",
			text: t("navbar.notifications.info.signout"),
		});
	}

	return (
		<Layout>
			<Navbar
				onLoginClick={() => setVisible(true)}
				onLogoutClick={handleLogout}
			/>
			{children}
			<Footer />

			<Modal {...bindings}>
				<Modal.Title>
					{t(`navbar.${isSignin ? "loginDialog" : "signupDialog"}.title`)}
				</Modal.Title>
				<Modal.Subtitle>
					{t(`navbar.${isSignin ? "loginDialog" : "signupDialog"}.description`)}
				</Modal.Subtitle>

				<Spacer y={2} />
				<Modal.Content>
					<AuthForm onSubmit={handleSubmit}>
						<Input
							width="100%"
							placeholder={t(
								`navbar.${isSignin ? "loginDialog" : "signupDialog"}.email`,
							)}
							{...emailBindings}
						/>
						<Spacer y={0.5} />
						<Input.Password
							width="100%"
							placeholder={t(
								`navbar.${isSignin ? "loginDialog" : "signupDialog"}.password`,
							)}
							{...pwdBindings}
						/>
						<Spacer y={1} />
						<Button
							htmlType="submit"
							type="secondary"
							loading={isSigningIn}
							auto
						>
							{t(`navbar.${isSignin ? "loginDialog" : "signupDialog"}.submit`)}
						</Button>
						<Spacer y={0.5} />
						<Button ghost auto onClick={() => setIsSignin(!isSignin)}>
							{t(`navbar.${isSignin ? "loginDialog" : "signupDialog"}.swap`)}
						</Button>
					</AuthForm>
				</Modal.Content>
			</Modal>
		</Layout>
	);
};

export default WebsiteLayout;
