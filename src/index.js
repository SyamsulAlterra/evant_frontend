import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import MyRoute from "./route/MyRoute";
import "./css/bootstrap.min.css";
import "./css/style.css";
import { initializeFirebase } from "./push-notification";

ReactDOM.render(<MyRoute />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
initializeFirebase();
serviceWorker.unregister();
