import React, { useState, useEffect } from "react";
import { homeOutline, personOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import "./css/Fav.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database, set } from "./firebase.js"; //imports firebase
import UserInfoPop from "./UserInfoPopover.jsx";
import { Popover, Button } from "antd";

//Front page

const Favorites= () => {
  // Checks to see if the user is logged in or not, displays there first and last name

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    // OnAuthStateChanged, is from firebase, checks for changes in authentication state
    // if that wasn't there basically, the site wouldn't be able to fetch the user's authentication state in time
    //  In short, checks whether user is logged in or not
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is signed in, gets first and last name
        const userRef = ref(database, "users/" + user.uid);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          setUserFirstName(userData.firstName);
          setUserLastName(userData.lastName);
          setIsLoggedIn(true);
          console.log("User:", userData.firstName, userData.lastName, " is signed in.");
        });
      } else {
        // User is signed out, clear the user's first name and last name
        setUserFirstName("");
        setUserLastName("");
        setIsLoggedIn(false);
        console.log("No User is signed in");
      }
    });

    // Cleans up from onauthstatechange, prevents memory leakage
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="TopMenu">
        <a href="/about.jsx" className="about">
          About
        </a>

        <h1 class="Cookly">
          <b>Favorites</b>
        </h1>

        <li className="A">
          <a className="house" href="/">
            <IonIcon icon={homeOutline}></IonIcon>
          </a>
        </li>
        <li className="B">
        <b> <UserInfoPop firstName={userFirstName} lastName={userLastName} /> </b>
          {!isLoggedIn && (
            <a className="Person" href="login.jsx">
              <IonIcon icon={personOutline}></IonIcon>
            </a>
          )}
        </li>
      </div>
      </>
  );
};

export default Favorites;