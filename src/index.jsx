import React, { useState, useEffect } from "react";
import { homeOutline, personOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import "./css/index2.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database, set } from "./firebase.js"; //imports firebase
import UserInfoPop from "./UserInfoPopover.jsx";
import { Popover, Button } from "antd";

//Front page

const WelcomePage = () => {
  // Checks to see if the user is logged in or not, displays there first and last name

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

        <h1 class="Cookly">
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

      <div className="Icons">
        <h2 className="Choose1">Welcome to Cookly!</h2>

        <p className="Choose">
          Select your time of day and unlock a world of flavorful recipes
          perfect for every moment, whether it's breakfast, lunch, dinner, or
          dessert.
        </p>
        <br />
        <div className="color">
          <a className="Photos" href="/breakfast.jsx">
            <img
              className="One"
              src="https://cdn.thelondoneconomic.com/wp-content/uploads/2021/08/d6209be9-how-to-make-the-perfect-full-english-breakfast-fry-up-scaled.jpeg"
              alt="Breakfast"
            />
            <p>Breakfast</p>
          </a>

          <a className="Photos" href="/lunch.jsx">
            <img
              className="Two"
              src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?cs=srgb&dl=pexels-robin-stickel-70497.jpg&fm=jpg"
              alt="Lunch"
            />
            <p>Lunch</p>
          </a>

          <a className="Photos" href="/dinner.jsx">
            <img
              className="Three"
              src="https://media.istockphoto.com/id/450705255/photo/homemade-turkey-thanksgiving-dinner.jpg?s=612x612&w=0&k=20&c=Bul88e51JYCw6o2JaLyvPKCZpg2R-qd2621978t7HRI="
              alt="Dinner"
            />
            <p>Dinner</p>
          </a>

          <a className="Photos" href="/dessert.jsx">
            <img
              className="Four"
              src="https://tmbidigitalassetsazure.blob.core.windows.net/wpthumbnailsprod/EasyFourLayerChocolateDessert%20DIYD%20187568%20042621%20H_thumbnail.jpeg"
              alt="Dessert"
            />
            <p>Dessert</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
