import { gql, useQuery } from "@apollo/client";
import { Card, Note, Spacer, Text, useToasts } from "@geist-ui/react";
import { useOnQuery as useFirebaseQuery } from "@typesaurus/react";
import { formatISO } from "date-fns";
import firebase from "firebase";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { collection, where } from "typesaurus";

import EventCard, { EventCardSkeleton } from "../../components/EventCard";
import { auth, firestore } from "../../config/firebase";
import { FirestoreEventPartecipation } from "../../typings/database/EventPartecipation";
import {
	getFutureEvents,
	getFutureEventsVariables,
} from "./.apollo/getFutureEvents";
import { AlertCard, EventsCarousel, Layout } from "./styles";

const eventsPartecipations = collection<FirestoreEventPartecipation>(
	"eventPartecipations",
);

const Events: React.FC = () => {
	const { t } = useTranslation();
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
					text: t("events.notifications.error.loginRequired"),
				});

			const authUser = await firestore.collection("users").doc(user.uid).get();
			const profile = await authUser.data();

			try {
				const currentPartecipationsDocument = await firestore
					.collection("eventPartecipations")
					.doc(eventId)
					.get();

				if (!currentPartecipationsDocument.exists) {
					await firestore.collection("eventPartecipations").doc(eventId).set({
						eventId,
					});
				}

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
						? t("events.notifications.info.addedPresence")
						: t("events.notifications.info.removedPresence"),
				});
			} catch {
				setToast({
					type: "error",
					text: t("events.notifications.error.presenceAdd", {
						presence: isPresent ? "out of" : "up to",
					}),
				});
			}
		},
		[setToast, t],
	);

	return (
		<Layout>
			<Text h1>{t("events.title")}</Text>
			{error && (
				<>
					<Note type="error">{error.message}</Note>
					<Spacer y={1} />
				</>
			)}
			{!(loading || eventsPartecipationsLoading) && events.length === 0 && (
				<AlertCard>
					<Text h2 size={80}>
						<span role="img" aria-label="Sad Face">
							😢
						</span>
					</Text>
					<Text h2>{t("events.noEvents.title")}</Text>
					<Text>{t("events.noEvents.details")}</Text>
				</AlertCard>
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
								locationAddress={event.spot?.address ?? ""} //TODO: remove the elvis
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
