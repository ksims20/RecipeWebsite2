import React from 'react';
import { IonIcon } from '@ionic/react';
import { homeOutline, personOutline, eggOutline, pizzaOutline, fastFoodOutline, beerOutline, flowerOutline } from 'ionicons/icons';
import './css/pick.css'; 
import UserInfoPop from "./UserInfoPopover.jsx";

// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { ref, onValue } from "firebase/database";
// import { database, set } from "./firebase.js"; //imports firebase


// Same Logic as in Index.jsx, just grabs the active user's info to be displayed.
//If no user is logged in then its not displayed
const CommonLayout = ({ title, activeTab, children }) => {
    const userFirstName = localStorage.getItem("firstName");
    const userLastName = localStorage.getItem("lastName");
    const isLoggedIn = localStorage.getItem("uid") != null;

//   const [userFirstName, setUserFirstName] = useState('');
//   const [userLastName, setUserLastName] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const auth = getAuth();

//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const userRef = ref(database, 'users/' + user.uid);
//         onValue(userRef, (snapshot) => {

//           console.log('Snapshot', snapshot);
//           const userData = snapshot.val();
//           console.log('User ID: ',user.uid, user.email, user);
//           console.log('USERDATA 1234!!!!!', userData);
//           setUserFirstName(userData.firstName);
//           setUserLastName(userData.lastName);
//           setIsLoggedIn(true);
//           console.log('User:', userData.firstName, userData.lastName, ' is signed in.');
//         });
//       } else {
//         setUserFirstName('');
//         setUserLastName('');
//         setIsLoggedIn(false);
//         console.log('No User is signed in');
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

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
