import { Text } from "@geist-ui/react";
import React from "react";

import { Avatar, Chip } from "./styles";

interface HandleChipProperties {
	icon: JSX.Element;
	value: string;
	href: string;
}

const HandleChip: React.FC<HandleChipProperties> = ({
	icon,
	value,
	href,
}: HandleChipProperties) => {
	return (
		<Chip href={href} target="_blank">
			<Avatar>{icon}</Avatar>
			<Text span>{value}</Text>
		</Chip>
	);
};

export default HandleChip;
