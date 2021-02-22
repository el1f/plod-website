import { Loading, Note } from "@geist-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { auth } from "../../config/firebase";

interface RestrictedRouteProperties extends RouteProps {
	requiresAuth?: boolean;
	requiresGuest?: boolean;
}

const RestrictedRoute: React.FC<RestrictedRouteProperties> = ({
	requiresAuth,
	requiresGuest,
	...rest
}: RestrictedRouteProperties) => {
	const [user, loading, error] = useAuthState(auth);

	if (loading) return <Loading />;

	if (error) return <Note type="error">{error}</Note>;

	if (requiresAuth && !user) return <Redirect to="/" />;
	if (requiresGuest && user) return <Redirect to="/me" />;

	return <Route {...rest} />;
};

export default RestrictedRoute;
