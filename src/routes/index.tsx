import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Profile from "./Profile";

const Routes: React.FC = () => {
	return (
		<Router>
			<Route path="/" component={Profile} />
		</Router>
	);
};

export default Routes;
