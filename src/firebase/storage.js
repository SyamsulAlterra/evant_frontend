import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdUJoodaUy03hkO4rDzGK5XKi39SxvGWw",
  authDomain: "elite-caster-248507.firebaseapp.com",
  databaseURL: "https://elite-caster-248507.firebaseio.com",
  projectId: "elite-caster-248507",
  storageBucket: "gs://elite-caster-248507.appspot.com",
  messagingSenderId: "326640704777",
  appId: "1:326640704777:web:ce14074cdf2291eb7fc7d8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
