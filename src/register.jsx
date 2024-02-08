import React, { useEffect, useState } from "react";
import { homeOutline, personOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import "./css/register.css";
import { Link } from "react-router-dom";
import { notification } from "antd";

import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged,} from "firebase/auth";
import { database, ref, set } from "./firebase.js"; //imports firebase
import { onValue } from "firebase/database";

import UserInfoPop from "./UserInfoPopover.jsx";
import { Popover, Button } from "antd";


// initialzing the auth variable
const auth = getAuth();

const Register = () => {
  //Handles the registration, code for the button click

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault(); // to stop the default form submission behavior

    console.log("Form Elements:", e.target);

    try {
      //Notes: Destructures, javascript feature, extracts values from arrays, and assign them to variables.
      const { first_name, last_name, email, password } = e.target.elements;

      //Extract values from the form element, ("?" - handles potential 'null' or 'undefined' values)
      const firstName = first_name?.value;
      const lastName = last_name?.value;
      const userEmail = email?.value;
      const userPassword = password?.value;

      //Checks to see if the email or password is missing
      if (!userEmail || !userPassword || !firstName || !lastName) {
        notification.error({
          message: "Unable to register",
          description: "Please fill out the form correctly",
        })
        console.error("Invalid form data");
        return;
      }

      //Registers the user with firebase authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      // Display a success notification for successful registration
      notification.success({
      message: 'Registration successful',
      duration: 2, // in seconds
    });
      console.log("Registration Successful");

      // Clear form fields after successful registration
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Utilizes Realtime Database
      //Notes for self:
      //.ref('users/' + user.uid) - Stores it under users (the node), and the key is their uid
      // and then set, sets the data at the location as an object, contains first/last/email
      const user = userCredential.user;
      const userRef = ref(database, "users/" + user.uid); // Get a reference to the user's location in the database
      await set(userRef, {
        firstName: firstName,
        lastName: lastName,
        email: userEmail,
      });

      console.log("user data saved successfully");

      // redirects them to login page after success
      setTimeout(() => {
        window.location.href = "/login.jsx";
      }, 2000); // redirects after 2 seconds

    } catch (error) {
      notification.error({
        message: 'Unable to register',
        description: error.message,
      });
      console.error("Registration Error", error.message);
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
              <form className="box" action="" onSubmit={handleRegistration}>
                <h1>Register</h1>
                <div className="input-box">
                  <h3>First Name</h3>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="input-box">
                  <h3>Last Name</h3>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="input-box">
                  <h3>Email</h3>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="input-box">
                  <h3>Password</h3>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="input-box">
                  <h3>Confirm Password</h3>
                  <input
                    type="password"
                    id="password_two"
                    name="password_two"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <button type="submit" className="btn">
                  Register
                </button>
                <div className="login-link">
                  <p>
                    Already have an account? <Link to="/login.jsx">Login</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
