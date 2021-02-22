import firebaseCore from "firebase/app";

import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import "firebase/performance";
import "firebase/functions";

export const firebaseConfig = {
	apiKey: "AIzaSyBVGK80ZevJwLixBVx4Ape0-riOe5L0Yj8",
	authDomain: "el1flem-pdlb.firebaseapp.com",
	projectId: "el1flem-pdlb",
	storageBucket: "el1flem-pdlb.appspot.com",
	messagingSenderId: "25758978750",
	appId: "1:25758978750:web:55c30e571828e835f984ef",
	measurementId: "G-SC18GGE4J7",
};

if (firebaseCore.apps.length === 0) {
	firebaseCore.initializeApp(firebaseConfig);
}

export const firebase = firebaseCore;
export const firestore = firebaseCore.firestore();
export const auth = firebase.auth();
export const functions = firebase.functions();
export const analytics = firebase.analytics();
