// TODO: find a way to reuse the layout of the component

import { Avatar, Button, Description, Text, useTheme } from "@geist-ui/react";
import React from "react";
import RectShape from "react-placeholder/lib/placeholders/RectShape";
import RoundShape from "react-placeholder/lib/placeholders/RoundShape";
import TextRow from "react-placeholder/lib/placeholders/TextRow";

import "react-placeholder/lib/reactPlaceholder.css";

import {
	Actions,
	Content,
	Cover,
	Date,
	DateDay,
	DateHour,
	Header,
	Location,
	PartecipantGroup,
	Wrapper,
} from "./styles";

const EventCardSkeleton: React.FC = () => {
	const { palette } = useTheme();

	return (
		<Wrapper>
			<Header>
				<Location>
					<RoundShape
						color={palette.accents_3}
						style={{ width: 20, height: 20 }}
					/>
					<Text>
						<TextRow
							color={palette.accents_3}
							style={{ width: 64, margin: 0 }}
						/>
					</Text>
				</Location>
				<Date>
					<DateHour>
						<Text>
							<strong>
								<TextRow
									color={palette.accents_3}
									style={{ width: 40, margin: 0 }}
								/>
							</strong>
						</Text>
					</DateHour>
					<DateDay>
						<Text>
							<strong>
								<TextRow
									color={palette.accents_3}
									style={{ width: 20, marginTop: 0, marginBottom: 2 }}
								/>
							</strong>
						</Text>
						<Text size={10} small>
							<TextRow
								color={palette.accents_3}
								style={{ width: 20, margin: 0 }}
							/>
						</Text>
					</DateDay>
				</Date>
			</Header>
			<Content>
				<Cover>
					<RectShape
						color={palette.accents_3}
						style={{ width: "100%", height: "100%" }}
					/>
				</Cover>
				<Text h3>
					<TextRow
						color={palette.accents_3}
						style={{ width: "60%", margin: 0 }}
					/>
				</Text>
				<PartecipantGroup>
					<Description
						title="HOSTED BY"
						content={
							<Avatar.Group>
								<Avatar stacked />
								<Avatar stacked />
								<Avatar stacked />
							</Avatar.Group>
						}
					/>
				</PartecipantGroup>
				<PartecipantGroup>
					<Description
						title="PARTECIPANTS"
						content={
							<Avatar.Group>
								<Avatar stacked />
								<Avatar stacked />
								<Avatar stacked />
								<Avatar stacked />
								<Avatar stacked />
							</Avatar.Group>
						}
					/>
				</PartecipantGroup>
				<Actions>
					<Button type="secondary" loading />
				</Actions>
			</Content>
		</Wrapper>
	);
};

export default EventCardSkeleton;
