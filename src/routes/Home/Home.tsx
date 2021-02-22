import React from "react";

import logo from "../../assets/logos/color.svg";
import { Navbar } from "../../components/Navbar";
import { Body, Layout } from "./styles";

const Home: React.FC = () => {
	return (
		<Layout>
			<Navbar />
			<Body>
				<img src={logo} alt="Padova Longboarding's logo" />
			</Body>
		</Layout>
	);
};

export default Home;
