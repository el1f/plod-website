import { SupportedSocial } from "../SupportedSocial";

export interface FirestoreUser {
	email: string;
	firstName: string;
	lastName: string;
	alias?: string;
	photoUrl: string;
	progressive: number;
	mainCrew: string;
	groups: string[];
	links: {
		type: SupportedSocial;
		label: string;
		target: string;
	};
}
