// import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyBro5GpyXQ3_co67zLvfYvPC17A9IL9gT4",
//   authDomain: "try-evant.firebaseapp.com",
//   databaseURL: "https://try-evant.firebaseio.com",
//   projectId: "try-evant",
//   storageBucket: "",
//   messagingSenderId: "679868161460",
//   appId: "1:679868161460:web:733059595e6aabae0f26e1"
// };

// export const initializeFirebase = () => {
//   firebase.initializeApp(firebaseConfig);
//   // firebase.initializeApp({
//   //   messagingSenderId: "679868161460"
//   // });

//   // navigator.serviceWorker
//   //   .register("../public/firebase-messaging-sw.js")
//   //   .then(registration => {
//   //     firebase.messaging().useServiceWorker(registration);
//   //   });
// };

// export const askForPermissioToReceiveNotifications = async () => {
//   try {
//     const messaging = firebase.messaging();
//     await messaging.requestPermission();
//     const token = await messaging.getToken();
//     localStorage.setItem("token_broadcast", token);
//     console.log("token do usuário:", token);

//     return token;
//   } catch (error) {
//     console.error(error);
//     localStorage.setItem("error", error);
//   }
// };

// class Firebase {
//   constructor() {
//     app.initializeApp(firebaseConfig);
//   }
// }

// export default Firebase;
