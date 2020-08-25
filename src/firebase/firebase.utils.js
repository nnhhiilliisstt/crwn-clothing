import firebase from "firebase/app";

import "firebase/firestore";

import "firebase/auth";

const config = {
  apiKey: "AIzaSyC2AjEOHnFOewm9q-ZyVJ9lcGg4BRr3-8s",
  authDomain: "crwn-db-3f709.firebaseapp.com",
  databaseURL: "https://crwn-db-3f709.firebaseio.com",
  projectId: "crwn-db-3f709",
  storageBucket: "crwn-db-3f709.appspot.com",
  messagingSenderId: "1078711940064",
  appId: "1:1078711940064:web:abcc0bed7b94e960c33185",
  measurementId: "G-V78GTBSYKQ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
