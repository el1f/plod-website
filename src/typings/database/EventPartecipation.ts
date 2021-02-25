export interface FirestoreEventPartecipation {
	eventId: string;
	count: number;
	presences: {
		userId: string;
		alias: string;
		name: string;
		photo?: string;
	}[];
}
