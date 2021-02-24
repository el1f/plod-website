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
import { auth } from "../../config/firebase";
import { AuthForm, Layout } from "./styles";

export interface WebsiteLayoutProperties {
	children: JSX.Element | JSX.Element[];
}

const WebsiteLayout: React.FC<WebsiteLayoutProperties> = ({
	children,
}: WebsiteLayoutProperties) => {
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [, setToast] = useToasts();
	const { setVisible, bindings } = useModal();
	const { state: email, bindings: emailBindings } = useInput("");
	const { state: pwd, bindings: pwdBindings } = useInput("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSigningIn(true);

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

		setIsSigningIn(false);
		setVisible(false);
	}

	return (
		<Layout>
			<Navbar onLoginClick={() => setVisible(true)} />
			{children}

			<Modal {...bindings}>
				<Modal.Title>Ready to shred.</Modal.Title>
				<Modal.Subtitle>
					Welcome home rider. Insert your creds to access
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
							Let me in
						</Button>
					</AuthForm>
				</Modal.Content>
			</Modal>
		</Layout>
	);
};

export default WebsiteLayout;
