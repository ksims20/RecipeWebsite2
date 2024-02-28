import React, { useState, useEffect } from "react";
import { Popover } from "antd";
import { homeOutline, personOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const UserInfoPop = ({ firstName, lastName }) => {
  //Tracks if the user is logged in
  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true); // User is logged in
      } else {
        setLoggedIn(false); // User is logged out
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Logout successful
        setLoggedIn(false); // Update login status
      })
      .catch((error) => {
        // Handle logout error
        console.error("Error logging out:", error);
      });
  };

  const content = (
    <div>
      <p className="menu-item">
        <a id="favorite-hover" href="Favs.jsx">
          Favorites
        </a>
      </p>
      <p className="menu-item" onClick={handleLogout}>
        Log out
      </p>
    </div>
  );

  const popOverTitle = (
    <span className="LoggedIn">
          Welcome, {firstName} {lastName} !
        </span>
  )

  return (
    //Only renders in the Popover if the user is loggedIn
    LoggedIn && (
      <Popover
        placement="bottom"
        title={popOverTitle}
        content={content}
        overlayStyle={{
          maxWidth: "220px",
          maxHeight: "50px",
          fontSize: "14px",
        }}
      >
        <span className="LoggedIn" style={{ fontSize: "22px" }}>
          <IonIcon icon={personOutline} />
        </span>
      </Popover>
    )
  );
};

export default UserInfoPop;
