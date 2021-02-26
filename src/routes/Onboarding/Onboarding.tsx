import { gql, useQuery } from "@apollo/client";
import {
	Avatar,
	Button,
	Card,
	Description,
	Grid,
	Input,
	Spacer,
	Text,
	Toggle,
	useInput,
	useToasts,
} from "@geist-ui/react";
import { format } from "date-fns";
import firebase from "firebase";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { analytics, auth, firestore, storage } from "../../config/firebase";
import { getCrews } from "./.apollo/getCrews";
import { AvatarCard, Container, CrewCard, CrewCardActions } from "./styles";

const Onboarding: React.FC = () => {
	const [, setToast] = useToasts();
	const [signingUp, setSigningUp] = useState(false);

	const { state: alias, bindings: aliasBindings } = useInput("");
	const { state: firstName, bindings: firstNameBindings } = useInput("");
	const { state: lastName, bindings: lastNameBindings } = useInput("");
	const [selectedCrew, setSelectedCrew] = useState<string | undefined>();
	const [groups, setGroups] = useState<string[]>([]);
	const [avatar, setAvatar] = useState<File | undefined>();
	const [avatarPreview, setAvatarPreview] = useState<string | undefined>();

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setAvatarPreview(URL.createObjectURL(acceptedFiles[0]));
		setAvatar(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const { data } = useQuery<getCrews>(
		gql`
			query getCrews {
				crews {
					id
					name
					logo {
						url(
							transformation: {
								image: { resize: { width: 256, height: 256, fit: crop } }
							}
						)
					}
				}
			}
		`,
	);

	async function uploadAvatar(
		storageReference: firebase.storage.Reference,
		avatar: File,
	) {
		return new Promise(function (resolve, reject) {
			const uploadTask = storageReference.put(avatar);
			uploadTask.on(
				"state_changed",
				function (snapshot) {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(`Upload is ${progress}% done`);
				},
				function error(error_) {
					console.log("error", error_);
					reject();
				},
				function complete() {
					uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
						resolve(downloadURL);
					});
				},
			);
		});
	}

	const submitUserForm = async () => {
		if (!auth.currentUser) return;

		setSigningUp(true);

		// 0. validate the user data
		if (!firstName || !lastName || !alias || !avatar) {
			setSigningUp(false);

			return setToast({
				type: "error",
				text: `You haven't filled the following fields: ${
					!firstName ? "First name," : ""
				} ${!lastName ? "Last name," : ""} ${!alias ? "Alias," : ""} ${
					!avatar ? "Avatar" : ""
				}`,
			});
		}

		// 1. upload the avatar to Firebase and get its URL
		setToast({
			text:
				"Starting the upload of your profile picture. This could take a while so please grab a cupo of coffee and wait.",
		});

		const avatarReference = storage
			.ref()
			.child(
				`/users/${auth.currentUser.uid}/propic${format(
					new Date(),
					"yyyyMMddhhmmss",
				)}.${avatar.name.split(".")[1]}`,
			);

		const avatarUrl = await uploadAvatar(avatarReference, avatar);

		setToast({
			type: "success",
			text:
				"Your avatar has been successfully uploaded! Now let's get the rest of your profile setup.",
		});

		// 2. Clean up the data before submitting

		const crewTuples = data?.crews.map((crew) => [crew.id, crew.name]) ?? [];
		const crewMap: Record<string, string> = Object.fromEntries(crewTuples);

		const profilePayload = {
			firstName,
			lastName,
			alias,
			groups: groups.map((groupId) => ({
				ref: groupId,
				name: crewMap[groupId],
			})),
			photoUrl: avatarUrl,
			...(selectedCrew
				? {
						selectedCrew: {
							ref: selectedCrew,
							name: crewMap[selectedCrew],
						},
				  }
				: {}),
			onboarded: true,
		};

		// 3. Update the user's profile

		try {
			await firestore
				.collection("users")
				.doc(auth.currentUser.uid)
				.update(profilePayload);

			analytics.logEvent("sign_up_onboard_user", {
				email: auth.currentUser.email,
				timestamp: new Date().toISOString(),
			});

			setToast({
				type: "success",
				text: "We got your user set up! Welcome to the gang my friend.",
			});
		} catch {
			setToast({
				type: "error",
				text: "There was an error updating your profile. Try again please!",
			});
		}

		setSigningUp(false);
	};

	return (
		<Container>
			<Text h1>{"Let's get started!"}</Text>
			<Text h5>
				{
					"Welcome to Padova Longboard! The coolest group of longboarders you can find around you! We checked to make sure that we can make such a statement and we're still not sure we can but whatever!"
				}
			</Text>
			<Text>
				{
					"We're going to need a couple pieces of information on you to be able to sign you up to our events and stuff! Hope you're ready!"
				}
			</Text>
			<Spacer y={2.5} />
			<Text h4>The basics</Text>
			<Grid.Container gap={1}>
				<Grid xs={24} md={8}>
					<Input
						{...firstNameBindings}
						placeholder="First Name"
						size="large"
						width="100%"
					/>
				</Grid>
				<Grid xs={24} md={8}>
					<Input
						{...lastNameBindings}
						placeholder="Last Name"
						size="large"
						width="100%"
					/>
				</Grid>
			</Grid.Container>
			<Spacer y={1.5} />
			<Text h4>And how should WE call you?</Text>
			<Grid.Container gap={1}>
				<Grid xs={24} md={12}>
					<Input
						{...aliasBindings}
						placeholder="Alias"
						size="large"
						width="100%"
					/>
				</Grid>
			</Grid.Container>
			<Spacer y={1.5} />
			<Text h4>Show us how you look!</Text>
			<Grid.Container gap={1}>
				<Grid xs={24} md>
					<Card {...getRootProps()} hoverable>
						<input {...getInputProps()} />
						<AvatarCard>
							<Avatar
								src={avatarPreview}
								size={128}
								text={
									alias
										? alias?.[0]
										: `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`
								}
							/>
							<div>
								<Text h5>Your avatar</Text>
								<Text span>Click this card to pick your avatar!</Text>
							</div>
						</AvatarCard>
					</Card>
				</Grid>
			</Grid.Container>
			<Spacer y={1.5} />
			<Text h4>Are you part of one of our crews?</Text>
			<Grid.Container gap={1}>
				{data?.crews.map((crew) => (
					<Grid key={crew.id} xs={12} md={8}>
						<CrewCard hoverable>
							<Avatar
								size={96}
								src={crew.logo.url}
								text={
									alias
										? alias?.[0]
										: `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`
								}
							/>
							<Text>{crew.name}</Text>
							<Card.Footer>
								<CrewCardActions>
									<Description
										title="Member"
										content={
											<Toggle
												size="large"
												checked={groups?.includes(crew.id)}
												onChange={() =>
													setGroups(
														groups?.includes(crew.id)
															? groups.filter((group) => group !== crew.id)
															: [...groups, crew.id],
													)
												}
											/>
										}
									/>
									<Description
										title="Main Crew"
										content={
											<Toggle
												size="large"
												checked={selectedCrew === crew.id}
												onChange={() => {
													if (crew.id === selectedCrew) {
														setSelectedCrew(undefined);
													} else {
														setSelectedCrew(crew.id);
														setGroups(
															groups?.includes(crew.id)
																? groups
																: [...groups, crew.id],
														);
													}
												}}
											/>
										}
									/>
								</CrewCardActions>
							</Card.Footer>
						</CrewCard>
					</Grid>
				))}
			</Grid.Container>
			<Spacer y={3} />
			<Button
				type="secondary"
				size="large"
				loading={signingUp}
				auto
				onClick={() => submitUserForm()}
			>
				Get me in!
			</Button>
		</Container>
	);
};

export default Onboarding;
