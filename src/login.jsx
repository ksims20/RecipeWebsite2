import React, { useState, useEffect } from "react";
import { homeOutline, personOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import "./css/login.css";
import { Link } from "react-router-dom";
import UserInfoPop from "./UserInfoPopover.jsx";
import { notification } from "antd";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import "firebase/compat/auth";
// import "firebase/compat/database";
import { onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import { database, ref, set } from "./firebase.js"; //imports firebase

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  // Copy and paste from index.jsx, same exact code
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(database, "users/" + user.uid);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          setUserFirstName(userData.firstName);
          setUserLastName(userData.lastName);
          console.log(
            "User:",
            userData.firstName,
            userData.lastName,
            " is signed in."
          );
          // set user info to local storage when user logs in
          console.log("User", user);
          localStorage.setItem("lastName", userData.lastName);
          localStorage.setItem("firstName", userData.firstName);
          localStorage.setItem("email", user.email);
          localStorage.setItem("uid", user.uid);
        });
      } else {
        setUserFirstName("");
        setUserLastName("");
        console.log("No User is signed in");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // Fetches user information from the database
      const user = auth.currentUser;
      if (user) {
        // Display a notification for successful login
        notification.success({
          message: "Log in successful!",
          duration: 2, //in seconds
        });

        // Redirect to the home page after successful login with delay
        setTimeout(() => {
          window.location.href = "/";
        }, 2000); // redirects after 2 seconds
      } else {
        notification.error({
          message: "Log in unsuccessful",
          description: "Invalid email or password :(",
          duration: 3, // in seconds
        });
        console.error("User not found");
      }

      //same logic from register.jsx
      const userRef = ref(database, "users/" + user.uid); // Get a reference to the user's location in the database
      userRef.once("value", (snapshot) => {
        const userData = snapshot.val();

        //extracts the first and last name
        setUserFirstName(userData.firstName);
        setUserLastName(userData.lastName);
      });
    } catch (error) {
      console.error("Login Error", error.message);
    }
  };

  return (
    <>
      <div className="TopMenu">
        <a href="About.html" className="about">
          About
        </a>

        <h1 id="header">
          <b>Cookly</b>
        </h1>

        <li className="A">
          <a className="house" href="/">
            <IonIcon icon={homeOutline}></IonIcon>
          </a>
        </li>
        <li className="B">
          <a className="Person" href="login.jsx">
            <IonIcon icon={personOutline}></IonIcon>
          </a>
        </li>
      </div>

      <main>
        <div className="divider">
          <div className="left-side">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
          </div>
          <div className="right-side">
            <div className="wrapper">
              <form className="box" onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <IonIcon name="person"></IonIcon>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <IonIcon name="lock-closed"></IonIcon>
                </div>
                <button type="submit" className="btn">
                  Login
                </button>
                <div className="register-link">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register.jsx">Register</Link>
                  </p>
                  {/* {userFirstName && <p>Welcome, {userFirstName}! </p>} */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
