import { Button } from "@geist-ui/react";
import React from "react";
import { FiDownload, FiShare2 } from "react-icons/fi";

import ProfileCard from "../../components/ProfileCard";
import { Actions, Body, Layout } from "./styles";

const Profile: React.FC = () => {
	return (
		<Layout>
			<div />
			<Body>
				<ProfileCard
					name="Ayoub Aabass"
					photo="https://scontent-mxp1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/119656563_783159952226833_6048042685991254373_n.jpg?_nc_ht=scontent-mxp1-1.cdninstagram.com&_nc_cat=101&_nc_ohc=tG7XuYW7TD4AX83nIn3&tp=1&oh=8cfb92232f9584f185fd0fd7e1619c41&oe=6059D964"
					groups={["@padova_longboarding"]}
					links={[
						{
							icon: "instagram",
							handle: "@aabassayoub",
							target: "https://instagram.com/aabassayoub",
						},
					]}
				/>
			</Body>
			<Actions>
				<Button size="large" type="secondary" icon={<FiShare2 />}>
					Share
				</Button>
				<Button size="large" icon={<FiDownload />}>
					Download
				</Button>
			</Actions>
			<div />
		</Layout>
	);
};

export default Profile;
