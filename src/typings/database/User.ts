import { SupportedSocial } from "../SupportedSocial";

export interface FirestoreUser {
	email: string;
	firstName?: string;
	lastName?: string;
	alias?: string;
	photoUrl?: string;
	progressive: number;
	mainCrew?: {
		ref: string;
		name: string;
	};
	groups?: {
		ref: string;
		name: string;
	}[];
	links?: {
		type: SupportedSocial;
		label: string;
		target: string;
	}[];
	verified: boolean;
	onboarded: boolean;
}
