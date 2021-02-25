import { Loading, Note } from "@geist-ui/react";
import { useOnGet } from "@typesaurus/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { collection } from "typesaurus";

import { auth } from "../../config/firebase";
import { FirestoreUser } from "../../typings/database/User";

interface RestrictedRouteProperties extends RouteProps {
	requiresAuth?: boolean;
	requiresOnboarding?: boolean;
	requiresUnonboarding?: boolean;
	requiresGuest?: boolean;
}

const users = collection<FirestoreUser>("users");

const RestrictedRoute: React.FC<RestrictedRouteProperties> = ({
	requiresAuth,
	requiresGuest,
	requiresOnboarding,
	requiresUnonboarding,
	...rest
}: RestrictedRouteProperties) => {
	const [user, loading, error] = useAuthState(auth);
	const [profile, { loading: profileLoading, error: profileError }] = useOnGet(
		users,
		user?.uid ?? "",
	);

	console.log("AUTH", requiresOnboarding, profile, !profile?.data.onboarded);

	if (loading) return <Loading />;

	if (error || profileError) return <Note type="error">{error}</Note>;

	if (requiresAuth && !user) return <Redirect to="/" />;
	if (requiresOnboarding && profile && !profile?.data.onboarded)
		return <Redirect to="/onboarding" />;
	if (requiresUnonboarding && profile?.data.onboarded)
		return <Redirect to="/" />;
	if (requiresGuest && user) return <Redirect to="/me" />;

	return <Route {...rest} />;
};

export default RestrictedRoute;
