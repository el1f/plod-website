import { Loading } from "@geist-ui/react";
import { useGet, useQuery } from "@typesaurus/react";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { collection, where } from "typesaurus";

import { Navbar } from "../../components/Navbar";
import ProfileCard from "../../components/ProfileCard";
import { auth } from "../../config/firebase";
import { FirestoreUser } from "../../typings/database/User";
import { Actions, Body, Layout } from "./styles";

const users = collection<FirestoreUser>("users");

const Profile: React.FC = () => {
	const meMatch = useRouteMatch("/me");
	const uidMatch = useRouteMatch<{ uid: string }>("/user/:uid");
	const aliasMatch = useRouteMatch<{ alias: string }>("/rider/:alias");
	const useUid = meMatch || uidMatch;
	const useAlias = Boolean(aliasMatch);

	const uid = (meMatch ? auth.currentUser?.uid : uidMatch?.params.uid) ?? "";
	const alias = aliasMatch?.params.alias ?? "";

	const [uidUser, { loading: uidLoading, error: uidError }] = useGet(
		users,
		uid,
	);
	const [
		aliasUser,
		{ loading: aliasLoading, error: aliasError },
	] = useQuery(users, [where("alias", "==", alias)]);

	const user = uidUser?.data || aliasUser?.[0]?.data;

	if ((useUid && uidError) || (useAlias && aliasError) || !user) return null;

	if ((useUid && uidLoading) || (useAlias && aliasLoading)) return <Loading />;

	return (
		<Layout>
			<Navbar />
			<div />
			<Body>
				<ProfileCard
					name={`${user.firstName} ${user.lastName}`}
					photo={user.photoUrl}
					groups={user.groups}
					links={user.links?.map((link) => ({
						handle: link.label,
						icon: link.type,
						target: link.target,
					}))}
				/>
			</Body>
			<Actions>
				{/* <Button size="large" type="secondary" icon={<FiShare2 />}>
					Share
				</Button>
				<Button size="large" icon={<FiDownload />}>
					Download
				</Button> */}
			</Actions>
			<div />
		</Layout>
	);
};

export default Profile;
