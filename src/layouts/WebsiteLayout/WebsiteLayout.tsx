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

import { Navbar } from "../../components/Navbar";
import { analytics, auth } from "../../config/firebase";
import { AuthForm, Layout } from "./styles";

export interface WebsiteLayoutProperties {
	children: JSX.Element | JSX.Element[];
}

const WebsiteLayout: React.FC<WebsiteLayoutProperties> = ({
	children,
}: WebsiteLayoutProperties) => {
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
					text: "Welcome to the club man",
				});
			} catch {
				setToast({
					type: "error",
					text: "There was an error with your login. Try again",
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
					text: "Welcome to the club man",
				});
			} catch {
				setToast({
					type: "error",
					text: "There was an error creating your account. Try again",
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
			text: "Godspeed rider! See you later.",
		});
	}

	return (
		<Layout>
			<Navbar
				onLoginClick={() => setVisible(true)}
				onLogoutClick={handleLogout}
			/>
			{children}

			<Modal {...bindings}>
				<Modal.Title>
					{isSignin ? "Ready to shred." : "Welcome fella!"}
				</Modal.Title>
				<Modal.Subtitle>
					{isSignin
						? "Welcome home rider. Insert your creds to access"
						: "Time to join the steeziest group of riders in all of Italy!"}
				</Modal.Subtitle>

				<Spacer y={2} />
				<Modal.Content>
					<AuthForm onSubmit={handleSubmit}>
						<Input width="100%" placeholder="Email" {...emailBindings} />
						<Spacer y={0.5} />
						<Input.Password
							width="100%"
							placeholder="Password"
							{...pwdBindings}
						/>
						<Spacer y={1} />
						<Button
							htmlType="submit"
							type="secondary"
							loading={isSigningIn}
							auto
						>
							{isSignin ? "Let' go!" : "Let me in!"}
						</Button>
						<Spacer y={0.5} />
						<Button ghost auto onClick={() => setIsSignin(!isSignin)}>
							{isSignin ? "Create an account" : "I already have an account"}
						</Button>
					</AuthForm>
				</Modal.Content>
			</Modal>
		</Layout>
	);
};

export default WebsiteLayout;
