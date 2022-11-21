import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const config = {
  apiKey: "AIzaSyDvy1hPQNmOuNkC3DmHyctXOm9S-EGSRNU",
  authDomain: "what-the-gif.firebaseapp.com",
  databaseURL: "https://what-the-gif.firebaseio.com",
  projectId: "what-the-gif",
  storageBucket: "what-the-gif.appspot.com",
  messagingSenderId: "1004890190412",
  appId: "1:1004890190412:web:027c551fd7ddafd2d3fae9",
  measurementId: "G-ED1VCYTYJ5",
};

const app = initializeApp(config);
export const db = getFirestore(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
