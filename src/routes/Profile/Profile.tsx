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
import { useRouteMatch } from "react-router-dom";
import { collection, where } from "typesaurus";

import ProfileCard from "../../components/ProfileCard";
import SocialShareButton from "../../components/SocialShareButton";
import { auth } from "../../config/firebase";
import { CopyIcon, ShareIcon } from "../../config/icons";
import { FirestoreUser } from "../../typings/database/User";
import { Actions, AvailableSocials, Body, Layout, SharePanel } from "./styles";

const users = collection<FirestoreUser>("users");

const Profile: React.FC = () => {
	const profileFieldReference = useRef<HTMLInputElement>(null);

	const { setVisible, bindings } = useModal();
	const [, setToast] = useToasts();
	const { copy } = useClipboard();

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

	// Sharing

	const sharableUrl = `https://padovalongboard.com/rider/${
		alias || user.alias
	}`;

	const shareText = encodeURI("Check my Rider Profile on Padova Longboard!");

	const shareMessage = `${shareText}%0A%0A${sharableUrl}`;

	const shareData = {
		title: `${user.firstName} ${user.lastName} AKA ${user.alias}`,
		text: `Padova Longboarding rider profile - Riding for ${user.mainCrew}`,
		url: sharableUrl,
	};

	function shareWithNavigator(): void {
		try {
			navigator.share(shareData);
			setVisible(false);
		} catch {
			setToast({
				type: "error",
				text:
					"There was an error while sharing your profile. This can be caused by your browers or device not supporting this functionality. Try again or copy the URL.",
			});
		}
	}

	function copyToClipboard(): void {
		copy(sharableUrl);
		setToast({
			text: "Your link has been successfully copied!",
		});
	}

	return (
		<Layout>
			<div />
			<Body>
				<ProfileCard
					name={`${user.firstName} ${user.lastName}`}
					photo={user.photoUrl ?? ""}
					groups={user.groups}
					links={user.links?.map((link) => ({
						handle: link.label,
						icon: link.type,
						target: link.target,
					}))}
				/>
			</Body>
			<Actions>
				<Button
					size="large"
					type="secondary"
					icon={<ShareIcon />}
					onClick={() => setVisible(true)}
				>
					Share
				</Button>
				{/* <Button size="large" icon={<FiDownload />}>
					Download
				</Button> */}
			</Actions>
			<div />

			<Modal {...bindings}>
				<Modal.Title>Share the steeze</Modal.Title>
				<Modal.Subtitle>
					Share your rider profile with whomever you want, however you want!
				</Modal.Subtitle>
				<Spacer y={2} />
				<Modal.Content>
					<SharePanel>
						<AvailableSocials>
							<SocialShareButton
								social="whatsapp"
								target={`https://api.whatsapp.com/send?text=${shareMessage}`}
							/>
							<SocialShareButton
								social="telegram"
								target={`https://t.me/share/url?url=${sharableUrl}&text=${shareText}`}
							/>
						</AvailableSocials>
						<Input
							ref={profileFieldReference}
							width="100%"
							value={sharableUrl}
							iconRight={<CopyIcon />}
							onIconClick={copyToClipboard}
							iconClickable
							readOnly
						/>
						<Spacer y={0.5} />
						{navigator.share && (
							<Button
								size="large"
								type="secondary"
								icon={<ShareIcon />}
								onClick={shareWithNavigator}
							>
								Share with...
							</Button>
						)}
					</SharePanel>
				</Modal.Content>
			</Modal>
		</Layout>
	);
};

export default Profile;
