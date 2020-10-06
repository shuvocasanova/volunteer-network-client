import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import * as firebase from "firebase/app";
import "firebase/auth";
import { userContext } from "../../App";

const Login = () => {
  const [loginUser, setLoginUser] = useContext(userContext);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleLogin = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyAzqHbRy8iQ0HvhX9JrjEPBP4jVwY_IMkc",
      authDomain: "ar-volunteer-network.firebaseapp.com",
      databaseURL: "https://ar-volunteer-network.firebaseio.com",
      projectId: "ar-volunteer-network",
      storageBucket: "ar-volunteer-network.appspot.com",
      messagingSenderId: "995437466125",
      appId: "1:995437466125:web:ae5969acbff3d556247b44",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function (result) {
        var user = result.user;
        setLoginUser({ name: user.displayName, email: user.email });
        history.replace(from);
      })
      .catch(function (error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div
      style={{ minHeight: "50vh" }}
      className="w-75 d-flex flex-column justify-content-center align-items-center border mt-5 mx-auto px-5"
    >
      <h1 className="text-center w-100">Login with</h1>
      <p
        onClick={handleGoogleLogin}
        style={{ borderRadius: "50px", cursor: "pointer" }}
        className="w-100 text-center my-5 border py-3"
      >
        Continue with Google
      </p>
      <p>Don't have an account? Create an account.</p>
    </div>
  );
};

export default Login;
