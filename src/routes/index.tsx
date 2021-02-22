import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Profile from "./Profile";

const Routes: React.FC = () => {
	return (
		<Router>
			<Route path="/me" component={Profile} />
			<Route path="/rider/:alias" component={Profile} />
			<Route path="/user/:uid" component={Profile} />
		</Router>
	);
};

export default Routes;
