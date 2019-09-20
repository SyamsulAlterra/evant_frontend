// import firebase2 from "firebase/app";
import firebase from "firebase";
import "firebase/storage";

// const firebaseConfig2 = {
//   apiKey: "AIzaSyAdUJoodaUy03hkO4rDzGK5XKi39SxvGWw",
//   authDomain: "elite-caster-248507.firebaseapp.com",
//   databaseURL: "https://elite-caster-248507.firebaseio.com",
//   projectId: "elite-caster-248507",
//   storageBucket: "gs://elite-caster-248507.appspot.com",
//   messagingSenderId: "326640704777",
//   appId: "1:326640704777:web:ce14074cdf2291eb7fc7d8"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig2);

// export const storage = firebase.storage();

const firebaseConfig = {
  apiKey: "AIzaSyBro5GpyXQ3_co67zLvfYvPC17A9IL9gT4",
  authDomain: "try-evant.firebaseapp.com",
  databaseURL: "https://try-evant.firebaseio.com",
  projectId: "try-evant",
  storageBucket: "gs://try-evant.appspot.com",
  messagingSenderId: "679868161460",
  appId: "1:679868161460:web:733059595e6aabae0f26e1"
};

export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};
