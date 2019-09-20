import app from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBro5GpyXQ3_co67zLvfYvPC17A9IL9gT4",
  authDomain: "try-evant.firebaseapp.com",
  databaseURL: "https://try-evant.firebaseio.com",
  projectId: "try-evant",
  storageBucket: "",
  messagingSenderId: "679868161460",
  appId: "1:679868161460:web:733059595e6aabae0f26e1"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
  }
}

export default Firebase;
