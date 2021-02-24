import { Text } from "@geist-ui/react";
import React from "react";

import EventCard from "../../components/EventCard";
import { EventsCarousel, Layout } from "./styles";

const Events: React.FC = () => {
	return (
		<Layout>
			<Text h1>Events</Text>
			<EventsCarousel>
				<EventCard
					name="The testing grounds"
					date="2021-02-27T13:00:00+00:00"
					locationName="Prato della valle"
				/>
			</EventsCarousel>
		</Layout>
	);
};

export default Events;
