importScripts("https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.6.1/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "679868161460"
});

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
