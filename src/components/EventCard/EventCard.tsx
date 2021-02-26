import {
	Avatar,
	Button,
	Description,
	Link,
	Popover,
	Tag,
	Text,
	Tooltip,
} from "@geist-ui/react";
import { add, format, getDate, parseISO } from "date-fns";
import React, { useMemo } from "react";

import { LocationIcon } from "../../config/icons";
import {
	Actions,
	Categories,
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

interface EventCardProperties {
	name: string;
	date: string;
	locationName: string;
	locationAddress: string;
	locationCoords?: [number, number];
	categories?: string[];
	cover?: string;
	hosts?: {
		name: string;
		photo: string;
	}[];
	partecipants?: {
		name: string;
		photo?: string;
	}[];
	partecipantsCount?: number;
	isPresent?: boolean;
	onPartecipationClick: () => void;
}

const EventCard: React.FC<EventCardProperties> = ({
	name,
	date,
	locationName,
	locationAddress,
	locationCoords,
	categories = [],
	cover,
	hosts = [],
	partecipants = [],
	partecipantsCount = 0,
	isPresent = false,
	onPartecipationClick,
}: EventCardProperties) => {
	const avatarCount = 8;
	const morePresenceCount = 5;
	const dateObject = parseISO(date);
	const eventHour = format(dateObject, "HH:mm");
	const eventDate = getDate(dateObject);
	const eventMonth = format(dateObject, "MMM");

	const categoriesElement = useMemo(
		() =>
			categories.length > 0 ? (
				<Categories>
					{categories.map((category) => (
						<Tag key={category}>{category}</Tag>
					))}
				</Categories>
			) : null,
		[categories],
	);

	return (
		<Wrapper>
			<Header>
				<Location
					href={
						locationCoords
							? `https://www.google.com/maps/search/?api=1&query=${locationCoords[0]},${locationCoords[1]}`
							: ""
					}
					target="_blank"
				>
					<LocationIcon />
					<Text span>{locationName}</Text>
				</Location>
				<Popover
					placement="bottomEnd"
					content={
						<>
							<Popover.Item>
								<Link
									href={`http://www.google.com/calendar/event?${encodeURI(
										`action=TEMPLATE&dates=${format(
											dateObject,
											"yyyyMMdd'T'HHmm00",
										)}/${format(
											add(dateObject, { hours: 4 }),
											"yyyyMMdd'T'HHmm00",
										)}&text=${name}&location=${locationAddress}`,
									)}`}
									target="_blank"
								>
									Add to Google Calendar
								</Link>
							</Popover.Item>
						</>
					}
				>
					<Date
						whileHover={{
							scale: 1.05,
						}}
						whileTap={{ scale: 0.95 }}
					>
						<DateHour>
							<Text>
								<strong>{eventHour}</strong>
							</Text>
						</DateHour>
						<DateDay>
							<Text>
								<strong>{eventDate}</strong>
							</Text>
							<Text size={10} small>
								{eventMonth}
							</Text>
						</DateDay>
					</Date>
				</Popover>
			</Header>
			<Content>
				{cover && (
					<Cover>
						<img src={cover} alt="" />
						{categoriesElement}
					</Cover>
				)}
				{!cover && categoriesElement}
				<Text h3>{name}</Text>
				{hosts.length > 0 && (
					<PartecipantGroup>
						<Description
							title="HOSTED BY"
							content={
								<Avatar.Group>
									{hosts.map(({ name, photo }) => (
										<Tooltip key={name} text={name}>
											<Avatar src={photo} stacked />
										</Tooltip>
									))}
								</Avatar.Group>
							}
						/>
					</PartecipantGroup>
				)}
				<PartecipantGroup>
					<Description
						title="PARTECIPANTS"
						content={
							partecipants.length > 0 ? (
								<Avatar.Group>
									{partecipants.slice(0, avatarCount).map(({ name, photo }) => (
										<Tooltip key={name} text={name}>
											<Avatar src={photo} text={name[0]} stacked />
										</Tooltip>
									))}
									<Tooltip
										placement="bottom"
										text={
											<ul>
												{partecipants
													.slice(avatarCount, avatarCount + morePresenceCount)
													.map(({ name }) => (
														<li key={name}>{name}</li>
													))}
												{
													<li>
														Altri +
														{partecipantsCount -
															avatarCount -
															morePresenceCount}
													</li>
												}
											</ul>
										}
									>
										{partecipantsCount - avatarCount > 0 && (
											<Text>+{partecipantsCount - avatarCount}</Text>
										)}
									</Tooltip>
								</Avatar.Group>
							) : (
								"Nobody"
							)
						}
					/>
				</PartecipantGroup>
				<Actions>
					<Button type="secondary" onClick={onPartecipationClick}>
						{isPresent ? `I'm not coming anymore!` : `I'm coming too!`}
					</Button>
				</Actions>
			</Content>
		</Wrapper>
	);
};

export default EventCard;
