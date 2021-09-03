import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import $ from "../node_modules/jquery";
// import Popper from "../node_modules/popper.js";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import App from "./App";
import firebase from "firebase";

import store from "./store/index";
import { Provider } from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyB5xisL6Z8XtP5vgoI8cceP3Yrc82__NTM",
  authDomain: "talkify-54db0.firebaseapp.com",
  projectId: "talkify-54db0",
  storageBucket: "talkify-54db0.appspot.com",
  messagingSenderId: "559805747445",
  appId: "1:559805747445:web:a5e10d89dd97b0e39c35bc",
  measurementId: "G-XG5Q70QS8F",
};
firebase.initializeApp(firebaseConfig);

console.log(store.getState());
window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
