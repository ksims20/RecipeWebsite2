import React, { useState, useEffect } from "react";
import { IonIcon } from '@ionic/react';
import { homeOutline, personOutline, eggOutline, pizzaOutline, fastFoodOutline, beerOutline, flowerOutline } from 'ionicons/icons';
import './css/pick.css'; 
import UserInfoPop from "./UserInfoPopover.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase.js"; //imports firebase

// Same Logic as in Index.jsx, just grabs the active user's info to be displayed.
//If no user is logged in then its not displayed
const CommonLayout = ({ title, activeTab, children }) => {
  // const userFirstName = localStorage.getItem("firstName");
  // const userLastName = localStorage.getItem("lastName");
  // const isLoggedIn = localStorage.getItem("uid") != null;

  // NOTE TO SELF : I need the useEffect in RecipeLayout otherwise the person Icon doesn't appear when I log out on that page.

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  //Options for the logged in system, in addition deals with user hovering over the person icon
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);


  useEffect(() => {
    const auth = getAuth();

    // OnAuthStateChanged, is from firebase, checks for changes in authentication state
    // if that wasn't there basically, the site wouldn't be able to fetch the user's authentication state in time
    //  In short, checks whether user is logged in or not
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is signed in, gets first and last name, also sets 'logged in' to true
        const userRef = ref(database, "users/" + user.uid);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          setUserFirstName(userData.firstName);
          setUserLastName(userData.lastName);
          setIsLoggedIn(true);
          console.log(
            "User:",
            userData.firstName,
            userData.lastName,
            " is signed in."
          );
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
      <a href="/about.jsx" className="about">About</a>
      <h1 id="header"> <b>{title}</b> </h1>
        <li className={activeTab === 'home' ? 'A selected' : 'A'}>
          <a className="house" href="/"> <IonIcon icon={homeOutline}></IonIcon> </a>
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
    <div className="sidebar">
      <ul>
        <li><a className={activeTab === 'breakfast' ? 'selected' : ''} href="/breakfast.jsx">Breakfast<IonIcon icon={eggOutline}></IonIcon></a></li>
        <li><a className={activeTab === 'lunch' ? 'selected' : ''} href="/lunch.jsx">Lunch<IonIcon icon={pizzaOutline}></IonIcon></a></li>
        <li><a className={activeTab === 'dinner' ? 'selected' : ''}href="/dinner.jsx">Dinner<IonIcon icon={fastFoodOutline}></IonIcon></a></li>
        <li><a className={activeTab === 'dessert' ? 'selected' : ''} href="/dessert.jsx">Dessert<IonIcon icon={beerOutline}></IonIcon></a></li>
        <li><a className={activeTab === 'vegan' ? 'selected' : ''} href="vegan.jsx">Vegan/Vegeterian<IonIcon icon={flowerOutline}></IonIcon></a></li>
      </ul>
    </div>
    {children}
  </>
 );
};

export default CommonLayout;
