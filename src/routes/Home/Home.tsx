import React from "react";

import logo from "../../assets/logos/color.svg";
import { Layout, Main } from "./styles";

const Home: React.FC = () => {
	return (
		<Layout>
			<Main>
				<img src={logo} alt="Padova Longboarding's logo" />
			</Main>
		</Layout>
	);
};

export default Home;
