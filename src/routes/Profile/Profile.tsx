import {
	Button,
	Input,
	Loading,
	Modal,
	Spacer,
	useClipboard,
	useModal,
	useToasts,
} from "@geist-ui/react";
import { useGet, useQuery } from "@typesaurus/react";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useRouteMatch } from "react-router-dom";
import { collection, where } from "typesaurus";

import ProfileCard from "../../components/ProfileCard";
import SocialShareButton from "../../components/SocialShareButton";
import { analytics, auth } from "../../config/firebase";
import { CopyIcon, ShareIcon } from "../../config/icons";
import { FirestoreUser } from "../../typings/database/User";
import { Actions, AvailableSocials, Body, Layout, SharePanel } from "./styles";

const users = collection<FirestoreUser>("users");

const Profile: React.FC = () => {
	const { t } = useTranslation();
	const profileFieldReference = useRef<HTMLInputElement>(null);

	const { setVisible, bindings } = useModal();
	const [, setToast] = useToasts();
	const { copy } = useClipboard();

	const meMatch = useRouteMatch("/me");
	const uidMatch = useRouteMatch<{ uid: string }>("/user/:uid");
	const aliasMatch = useRouteMatch<{ alias: string }>("/rider/:alias");
	const useUid = meMatch || uidMatch;
	const useAlias = Boolean(aliasMatch);

	useEffect(() => {
		analytics.logEvent("profile_view", {
			alias: aliasMatch?.params.alias,
			uid: uidMatch?.params.uid,
			timestamp: new Date().toISOString(),
		});
	}, [aliasMatch?.params.alias, uidMatch?.params.uid]);

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

	// Sharing

	const sharableUrl = `https://padovalongboard.com/rider/${
		alias || user.alias
	}`;

	const shareText = encodeURI(t("profile.shareText"));

	const shareMessage = `${shareText}%0A%0A${sharableUrl}`;

	const shareData = {
		title: t("profile.shareText", {
			firstName: user.firstName,
			lastName: user.lastName,
			alias: user.alias,
		}),
		text: t("profile.shareDataText", { crew: user.mainCrew }),
		url: sharableUrl,
	};

	function shareWithNavigator(): void {
		try {
			navigator.share(shareData);
			setVisible(false);
		} catch {
			setToast({
				type: "error",
				text: t("profile.notifications.info.navigatorShareError"),
			});
		}
	}

	function copyToClipboard(): void {
		copy(sharableUrl);
		setToast({
			text: t("profile.notifications.info.clipboardCopy"),
		});
	}

	if (user && !user.verified && auth.currentUser?.email !== user.email)
		return <Redirect to="/" />;

	return (
		<Layout>
			<div />
			<Body>
				<ProfileCard
					name={`${user.firstName} ${user.lastName}`}
					photo={user.photoUrl ?? ""}
					groups={user.groups?.map((group) => group.name)}
					links={user.links?.map((link) => ({
						handle: link.label,
						icon: link.type,
						target: link.target,
					}))}
				/>
			</Body>
			<Actions>
				{user.verified && (
					<Button
						size="large"
						type="secondary"
						icon={<ShareIcon />}
						onClick={() => setVisible(true)}
					>
						{t("profile.share")}
					</Button>
				)}
				{/* <Button size="large" icon={<FiDownload />}>
					Download
				</Button> */}
			</Actions>
			<div />

			<Modal {...bindings}>
				<Modal.Title>{t("profile.shareDialog.title")}</Modal.Title>
				<Modal.Subtitle>{t("profile.shareDialog.description")}</Modal.Subtitle>
				<Spacer y={2} />
				<Modal.Content>
					<SharePanel>
						<AvailableSocials>
							<SocialShareButton
								social="whatsapp"
								target={`https://api.whatsapp.com/send?text=${shareMessage}`}
								onClick={() =>
									analytics.logEvent("profile_share", {
										method: "whatsapp",
									})
								}
							/>
							<SocialShareButton
								social="telegram"
								target={`https://t.me/share/url?url=${sharableUrl}&text=${shareText}`}
								onClick={() =>
									analytics.logEvent("profile_share", {
										method: "telegram",
									})
								}
							/>
						</AvailableSocials>
						<Input
							ref={profileFieldReference}
							width="100%"
							value={sharableUrl}
							iconRight={<CopyIcon />}
							onIconClick={() => {
								analytics.logEvent("profile_share", {
									method: "clipboard",
								});
								copyToClipboard();
							}}
							iconClickable
							readOnly
						/>
						<Spacer y={0.5} />
						{navigator.share && (
							<Button
								size="large"
								type="secondary"
								icon={<ShareIcon />}
								onClick={() => {
									analytics.logEvent("profile_share", {
										method: "navigator",
									});
									shareWithNavigator();
								}}
							>
								{t("profile.shareDialog.shareWith")}
							</Button>
						)}
					</SharePanel>
				</Modal.Content>
			</Modal>
		</Layout>
	);
};

export default Profile;
