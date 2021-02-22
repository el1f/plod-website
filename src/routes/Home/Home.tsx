import {
	Button,
	Input,
	Modal,
	Spacer,
	useInput,
	useModal,
	useToasts,
} from "@geist-ui/react";
import React, { FormEvent } from "react";

import logo from "../../assets/logos/color.svg";
import { Navbar } from "../../components/Navbar";
import { auth } from "../../config/firebase";
import { AuthForm, Body, Layout } from "./styles";

const Home: React.FC = () => {
	const [toasts, setToast] = useToasts();
	const { setVisible, bindings } = useModal();
	const { state: email, bindings: emailBindings } = useInput("");
	const { state: pwd, bindings: pwdBindings } = useInput("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

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
	}

	return (
		<Layout>
			<Navbar onLoginClick={() => setVisible(true)} />
			<Body>
				<img src={logo} alt="Padova Longboarding's logo" />
			</Body>

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
						<Button htmlType="submit" type="secondary" auto>
							Let me in
						</Button>
					</AuthForm>
				</Modal.Content>
			</Modal>
		</Layout>
	);
};

export default Home;
