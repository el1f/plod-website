import { SupportedSocial } from "../SupportedSocial";

export interface FirestoreCrew {
	name: string;
	logo: {
		thumbnail: string;
		large?: string;
		vector?: string;
	};
	links: {
		type: SupportedSocial;
		label: string;
		target: string;
	};
}
