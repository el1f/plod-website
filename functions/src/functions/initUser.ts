import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const initUser = functions.auth.user().onCreate(async (user) => {
	const database = admin.firestore();

	const counters = await database.collection("stats").doc("counters").get();
	const countersData = await counters.data();
	const usersCount = countersData?.name ?? 0;

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
		});
});

export default initUser;
