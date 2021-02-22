import firebaseCore from "firebase/app";

import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import "firebase/performance";
import "firebase/functions";

export const firebaseConfig = {
	apiKey: "AIzaSyCRnOxK-VTZYxHQzTcdTio3WQ-gcCxHn00",
	authDomain: "el1flem-bard-novella.firebaseapp.com",
	projectId: "el1flem-bard-novella",
	storageBucket: "el1flem-bard-novella.appspot.com",
	messagingSenderId: "1020208748171",
	appId: "1:1020208748171:web:d5a70a4b6867d7cb28668e",
};

if (firebaseCore.apps.length === 0) {
	firebaseCore.initializeApp(firebaseConfig);
}

export const firebase = firebaseCore;
export const firestore = firebaseCore.firestore();
export const storage = firebaseCore.storage();
export const auth = firebase.auth();
export const functions = firebase.functions();
export const analytics = firebase.analytics();
