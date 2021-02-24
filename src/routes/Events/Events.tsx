import { gql, useQuery } from "@apollo/client";
import { Note, Spacer, Text } from "@geist-ui/react";
import { useQuery as useFirebaseQuery } from "@typesaurus/react";
import { formatISO } from "date-fns";
import React, { useCallback } from "react";
import { collection, where } from "typesaurus";

import EventCard, { EventCardSkeleton } from "../../components/EventCard";
import { FirestoreEventPartecipation } from "../../typings/database/EventPartecipation";
import {
	getFutureEvents,
	getFutureEventsVariables,
} from "./.apollo/getFutureEvents";
import { EventsCarousel, Layout } from "./styles";

const eventsPartecipations = collection<FirestoreEventPartecipation>(
	"eventPartecipations",
);

const Events: React.FC = () => {
	const { loading, error, data } = useQuery<
		getFutureEvents,
		getFutureEventsVariables
	>(
		gql`
			query getFutureEvents($now: DateTime!) {
				events(where: { date_gte: $now }) {
					id
					name
					date
					categories
					cover {
						url(
							transformation: {
								image: { resize: { width: 320, height: 240, fit: crop } }
							}
						)
					}
					spot {
						name
						address
						location {
							latitude
							longitude
						}
					}
					hostCrews {
						name
						logo {
							url(
								transformation: {
									image: { resize: { width: 80, height: 80, fit: crop } }
								}
							)
						}
					}
					spot {
						name
					}
				}
			}
		`,
		{
			variables: {
				now: formatISO(new Date()),
			},
		},
	);

	const events = data?.events ?? [];

	const [
		eventsPartecipationsData,
		{ loading: eventsPartecipationsLoading },
	] = useFirebaseQuery(eventsPartecipations, [
		where("eventId", "in", events ? events.map((event) => event.id) : [""]),
	]);

	const handlePartecipationClick = useCallback(() => {
		alert("partecipating!");
	}, []);

	return (
		<Layout>
			<Text h1>Events</Text>
			{error && (
				<>
					<Note type="error">{error.message}</Note>
					<Spacer y={1} />
				</>
			)}
			<EventsCarousel>
				{(loading || eventsPartecipationsLoading) && (
					<>
						<EventCardSkeleton />
						<EventCardSkeleton />
					</>
				)}
				{events
					.filter((event) => Boolean(event.spot))
					.map((event) => {
						const presence = eventsPartecipationsData?.find(
							(eventPartecipation) =>
								eventPartecipation.data.eventId === event.id,
						)?.data;

						const partecipantsCount = presence?.count;
						const partecipantsData = presence?.presences?.map(
							(partecipant) => ({
								name: partecipant.name,
								photo: partecipant.photo,
							}),
						);

						return (
							<EventCard
								key={event.id}
								name={event.name}
								date={event.date}
								locationName={event.spot?.name ?? ""} //TODO: remove the elvis
								categories={event.categories}
								cover={event.cover?.url}
								hosts={event.hostCrews.map((crew) => ({
									name: crew.name,
									photo: crew.logo.url,
								}))}
								partecipants={partecipantsData}
								partecipantsCount={partecipantsCount}
								onPartecipationClick={handlePartecipationClick}
							/>
						);
					})}
			</EventsCarousel>
		</Layout>
	);
};

export default Events;
