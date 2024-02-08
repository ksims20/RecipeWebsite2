import React, { useState, useEffect} from 'react';
import { IonIcon } from '@ionic/react';
import { homeOutline, personOutline, eggOutline, pizzaOutline, fastFoodOutline, beerOutline } from 'ionicons/icons';
import './css/pick.css'; 
import UserInfoPop from "./UserInfoPopover.jsx";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database, set } from "./firebase.js"; //imports firebase


// Same Logic as in Index.jsx, just grabs the active user's info to be displayed.
//If no user is logged in then its not displayed
const CommonLayout = ({ title, activeTab, children }) => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(database, 'users/' + user.uid);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          setUserFirstName(userData.firstName);
          setUserLastName(userData.lastName);
          console.log('User:', userData.firstName, userData.lastName, ' is signed in.');
        });
      } else {
        setUserFirstName('');
        setUserLastName('');
        console.log('No User is signed in');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

return (
  <>
    <div className="TopMenu">
      <a href="/about.jsx" className="about">About</a>
      <h1 id="header"> <b>{title}</b> </h1>
      <b><UserInfoPop firstName={userFirstName} lastName={userLastName} /> </b>
        <li className={activeTab === 'home' ? 'A selected' : 'A'}>
          <a className="house" href="/"> <IonIcon icon={homeOutline}></IonIcon> </a>
        </li>
        <li className={activeTab === 'person' ? 'B selected' : 'B'}>
          <a className="Person" href="/login.jsx"> <IonIcon icon={personOutline}></IonIcon> </a>
        </li>
    </div>
    <div className="sidebar">
      <ul>
        <li><a href="/breakfast.jsx">Breakfast<IonIcon icon={eggOutline}></IonIcon></a></li>
        <li><a href="/lunch.jsx">Lunch<IonIcon icon={pizzaOutline}></IonIcon></a></li>
        <li><a href="/dinner.jsx">Dinner<IonIcon icon={fastFoodOutline}></IonIcon></a></li>
        {/* Testing active links */}
        <li><a className={activeTab === 'dessert' ? 'selected' : ''} href="/dessert.jsx">Dessert<IonIcon icon={beerOutline}></IonIcon></a></li>
      </ul>
    </div>
    {children}
  </>
 );
};

export default CommonLayout;
