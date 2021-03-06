import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDrfBTTXUhss5rI2Cfi__spn28r2geyZAA",
  authDomain: "clothing-website-75808.firebaseapp.com",
  databaseURL: "https://clothing-website-75808.firebaseio.com",
  projectId: "clothing-website-75808",
  storageBucket: "clothing-website-75808.appspot.com",
  messagingSenderId: "326835001370",
  appId: "1:326835001370:web:1e72228d6dfd9033d399a3",
  measurementId: "G-SR3CK0RWGG"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
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
