import React from "react";

import logo from "../../assets/logos/color.svg";
import { Layout } from "./styles";

const Home: React.FC = () => {
	return (
		<Layout>
			<img src={logo} alt="Padova Longboarding's logo" />
		</Layout>
	);
};

export default Home;
