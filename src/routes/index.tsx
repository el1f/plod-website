import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import RestrictedRoute from "../components/RestrictedRoute";
import WebsiteLayout from "../layouts/WebsiteLayout";
import Events from "./Events";
import Home from "./Home";
import Profile from "./Profile";

const Routes: React.FC = () => {
	return (
		<Router>
			<WebsiteLayout>
				<Switch>
					<Route path="/events" component={Events} />
					<RestrictedRoute path="/me" component={Profile} requiresAuth />
					<Route path="/rider/:alias" component={Profile} />
					<Route path="/user/:uid" component={Profile} />
					<RestrictedRoute path="/" component={Home} requiresGuest />
				</Switch>
			</WebsiteLayout>
		</Router>
	);
};

export default Routes;
