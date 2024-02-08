import React, { useState, useEffect } from 'react';
import { homeOutline, personOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './css/about.css'; 
import UserInfoPop from "./UserInfoPopover.jsx";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database, set } from "./firebase.js"; //imports firebase

const AboutUs = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

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
          console.log("User:", userData.firstName, userData.lastName, " is signed in.");
        });
      } else {
        // User is signed out, clear the user's first name and last name
        setUserFirstName("");
        setUserLastName("");
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

          <h1 id="header">
            <b>Cookly</b>
          </h1>

          <li className="A">
          <b> <UserInfoPop firstName={userFirstName} lastName={userLastName} /> </b>
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

        

          <div className="RightSide">
            <h1 className="text">About Us</h1>

            <p>
              Welcome to Cookly, where simplicity meets culinary delight. My minimalist-styled recipe platform is crafted to
              offer a seamless experience, focusing on ease of access and visual appeal. We understand the joy of cooking and
              sharing meals, which is why I designed this space for you to explore, discover, and savor delightful recipes
              tailored to your chosen time of day – whether it's breakfast, lunch, dinner, or dessert. Beyond that, my
              user-friendly interface allows you to create a personal account, saving your favorite recipes for future
              culinary adventures. Plus, sharing these delectable finds with friends is made effortless through shareable
              links. I strived to inspire you to return, offering a place where every visit brings new culinary inspiration
              and a sense of community around the joy of cooking and sharing good food
            </p>
          </div>

    </>
  );
};

export default AboutUs;
