import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const initUser = functions.auth.user().onCreate(async (user) => {
	const database = admin.firestore();

	const stats = await database.collection("stats").doc("stats").get();
	const statsData = await stats.data();
	const usersCount = statsData?.counters.users ?? 0;

	database
		.collection("stats")
		.doc("counters")
		.update({
			users: usersCount + 1,
		});

	database
		.collection("users")
		.doc(user.uid)
		.set({
			progressive: usersCount + 1,
			photoUrl: user.photoURL,
			email: user.email,
			onboarded: false,
			verified: false,
		});
});

export default initUser;
