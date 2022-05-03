import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const fire = firebase.initializeApp({
  apiKey: "AIzaSyCrEwYrJsWvLga5FvRArfwpal4tUwX3Shs",
  authDomain: "applicationstage-2aa9e.firebaseapp.com",
  projectId: "applicationstage-2aa9e",
  storageBucket: "applicationstage-2aa9e.appspot.com",
  messagingSenderId: "370732994851",
  appId: "1:370732994851:web:85a84e1a3f6a9616ec7c96",
});

export const auth = fire.auth();
export const db = fire.firestore();
export default {
  fire,
};
