import { gql, useQuery } from "@apollo/client";
import {
	Avatar,
	Card,
	Col,
	Description,
	Divider,
	Grid,
	Input,
	Row,
	Spacer,
	Text,
	Toggle,
	useInput,
} from "@geist-ui/react";
import React, { useState } from "react";

import { getCrews } from "./.apollo/getCrews";
import { AvatarCard, Container, CrewCard, CrewCardActions } from "./styles";

const Onboarding: React.FC = () => {
	const { state: alias, bindings: aliasBindings } = useInput("");
	const { state: firstName, bindings: firstNameBindings } = useInput("");
	const { state: lastName, bindings: lastNameBindings } = useInput("");
	const [selectedCrew, setSelectedCrew] = useState<string | undefined>();
	const [groups, setGroups] = useState<string[]>([]);

	const { loading, error, data } = useQuery<getCrews>(
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
					<Card hoverable>
						<AvatarCard>
							<Avatar
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
								size={128}
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
												onChange={() => setSelectedCrew(crew.id)}
											/>
										}
									/>
								</CrewCardActions>
							</Card.Footer>
						</CrewCard>
					</Grid>
				))}
			</Grid.Container>
		</Container>
	);
};

export default Onboarding;
