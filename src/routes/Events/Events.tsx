import { gql, useQuery } from "@apollo/client";
import { Note, Spacer, Text, useToasts } from "@geist-ui/react";
import { useOnQuery as useFirebaseQuery } from "@typesaurus/react";
import { formatISO } from "date-fns";
import firebase from "firebase";
import React, { useCallback, useMemo } from "react";
import { collection, where } from "typesaurus";

import EventCard, { EventCardSkeleton } from "../../components/EventCard";
import { auth, firestore } from "../../config/firebase";
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
	const [, setToast] = useToasts();

	const now = useMemo(() => formatISO(new Date()), []);

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
				now,
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

	const handlePartecipationClick = useCallback(
		async (eventId: string, isPresent: boolean) => {
			const user = auth.currentUser;
			if (!user)
				return setToast({
					type: "error",
					text: `You have to login to be able to check into events!`,
				});

			const authUser = await firestore.collection("users").doc(user.uid).get();
			const profile = await authUser.data();

			try {
				const currentPartecipationsDocument = await firestore
					.collection("eventPartecipations")
					.doc(eventId)
					.get();

				await firestore
					.collection("eventPartecipations")
					.doc(eventId)
					[currentPartecipationsDocument ? "update" : "set"]({
						presences: firebase.firestore.FieldValue[
							isPresent ? "arrayRemove" : "arrayUnion"
						]({
							userId: user.uid,
							alias: profile?.alias,
							name: `${profile?.firstName} ${profile?.lastName}`,
							photo: profile?.photoUrl,
						}),
					});

				setToast({
					type: "success",
					text: isPresent
						? "That's a bummer... Hope to see you in the next one!"
						: "Looking forward to seeing you there rider!",
				});
			} catch {
				setToast({
					type: "error",
					text: `There was an error signing you up ${
						isPresent ? "out of" : "to"
					} this event. Try again!`,
				});
			}
		},
		[setToast],
	);

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

						const partecipantsData = presence?.presences?.map(
							(partecipant) => ({
								name: partecipant.name,
								photo: partecipant.photo,
							}),
						);
						const isPresent =
							presence?.presences?.some(
								(partecipant) => partecipant.userId === auth.currentUser?.uid,
							) ?? false;

						return (
							<EventCard
								key={event.id}
								name={event.name}
								date={event.date}
								locationName={event.spot?.name ?? ""} //TODO: remove the elvis
								locationCoords={
									event.spot?.location
										? [
												event.spot.location.latitude,
												event.spot.location.longitude,
										  ]
										: undefined
								}
								categories={event.categories}
								cover={event.cover?.url}
								hosts={event.hostCrews.map((crew) => ({
									name: crew.name,
									photo: crew.logo?.url,
								}))}
								partecipants={partecipantsData}
								partecipantsCount={partecipantsData?.length ?? 0}
								isPresent={isPresent}
								onPartecipationClick={() =>
									handlePartecipationClick(event.id, isPresent)
								}
							/>
						);
					})}
			</EventsCarousel>
		</Layout>
	);
};

export default Events;
