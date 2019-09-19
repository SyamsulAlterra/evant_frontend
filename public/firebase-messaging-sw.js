importScripts("https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.6.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBro5GpyXQ3_co67zLvfYvPC17A9IL9gT4",
  authDomain: "try-evant.firebaseapp.com",
  databaseURL: "https://try-evant.firebaseio.com",
  projectId: "try-evant",
  storageBucket: "",
  messagingSenderId: "679868161460",
  appId: "1:679868161460:web:733059595e6aabae0f26e1"
};

firebase.initializeApp(firebaseConfig);

// firebase.initializeApp({
//   messagingSenderId: "679868161460"
// });

const messaging = firebase.messaging();

// import firebase from "firebase";

// export const inicializarFirebase = () => {
//   firebase.initializeApp({
//     messagingSenderId: "your messagingSenderId"
//   });

//   navigator.serviceWorker.register("/my-sw.js").then(registration => {
//     firebase.messaging().useServiceWorker(registration);
//   });
// };
