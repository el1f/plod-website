import { gql, useQuery } from "@apollo/client";
import { Text } from "@geist-ui/react";
import { formatISO } from "date-fns";
import React from "react";

import EventCard from "../../components/EventCard";
import {
	getFutureEvents,
	getFutureEventsVariables,
} from "./.apollo/getFutureEvents";
import { EventsCarousel, Layout } from "./styles";

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

	return (
		<Layout>
			<Text h1>Events</Text>
			<EventsCarousel>
				<EventCard
					name="The testing grounds"
					date="2021-02-27T13:00:00+00:00"
					locationName="Prato della valle"
				/>
				{events
					.filter((event) => Boolean(event.spot))
					.map((event) => (
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
						/>
					))}
			</EventsCarousel>
		</Layout>
	);
};

export default Events;
