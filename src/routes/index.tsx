import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import RestrictedRoute from "../components/RestrictedRoute";
import WebsiteLayout from "../layouts/WebsiteLayout";
import Events from "./Events";
import Home from "./Home";
import Onboarding from "./Onboarding";
import Profile from "./Profile";

const Routes: React.FC = () => {
	return (
		<Router>
			<WebsiteLayout>
				<Switch>
					<RestrictedRoute
						path="/onboarding"
						component={Onboarding}
						requiresUnonboarding
					/>
					<RestrictedRoute
						path="/events"
						component={Events}
						requiresOnboarding
					/>
					<RestrictedRoute
						path="/me"
						component={Profile}
						requiresAuth
						requiresOnboarding
					/>
					<RestrictedRoute
						path="/rider/:alias"
						component={Profile}
						requiresOnboarding
					/>
					<RestrictedRoute
						path="/user/:uid"
						component={Profile}
						requiresOnboarding
					/>
					<RestrictedRoute
						path="/"
						component={Home}
						requiresGuest
						requiresOnboarding
					/>
				</Switch>
			</WebsiteLayout>
		</Router>
	);
};

export default Routes;
