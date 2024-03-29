import React, { useState, useEffect } from "react";
import { homeOutline, personOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import "./css/Fav.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database, set, child } from "./firebase.js"; //imports firebase
import UserInfoPop from "./UserInfoPopover.jsx";
import { Button, Card, Drawer } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { notification } from "antd";

const Favorites = () => {
  //Same from index.jsx
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const [favorites, setFavorites] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  const [drawerVisible, setDrawerVisible] = useState(false);


  // (Gets the user's favorite's) in short, note to self: updates the component's state when a user logs in or out
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserFirstName(user.firstName);
        setUserLastName(user.lastName);
        setIsLoggedIn(true);
        fetchUserFavorites(user.uid);
      } else {
        setUserFirstName("");
        setUserLastName("");
        setIsLoggedIn(false);
        setUserFavorites([]);
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);


  // Gets and sets the user's information, first name, last name, user Id based on authentication state changes with firebase
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(database, "users/" + user.uid);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          setUserFirstName(userData.firstName);
          setUserLastName(userData.lastName);
          setIsLoggedIn(true);
        });
      } else {
        setUserFirstName("");
        setUserLastName("");
        setIsLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Just feteches the user's favorite recipes from firebase based on the UID, puts them in userFavorites array
  // if I didn't put it in an array it would grab the favorites from all users.
  const fetchUserFavorites = (userId) => {
    const favoritesRef = ref(database, `favorites/${userId}`);
    const unsubscribeFavorites = onValue(favoritesRef, (snapshot) => {
      const favoritesData = snapshot.val();
      if (favoritesData) {
        const favoritesList = Object.values(favoritesData);
        setUserFavorites(favoritesList);
      } else {
        setUserFavorites([]);
      }
    });
    return () => {
      unsubscribeFavorites();
    };
  };

  // Fetches user's favorite recipes only if there is an auth user
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      fetchUserFavorites(user.uid);
    }
  }, []);

  

  const toggleFavorite = async (recipe) => {
    const uid = user.uid;
    const favoritesRef = ref(database, `favorites/${uid}`);
    const isRecipeFavorite = favorites.includes(recipe.idMeal);
    if (isRecipeFavorite) {
      await set(child(favoritesRef, recipe.idMeal), null);
      setFavorites(favorites.filter((id) => id !== recipe.idMeal));
    } else {
      await set(child(favoritesRef, recipe.idMeal), recipe);
      setFavorites([...favorites, recipe.idMeal]);
    }
  };

  // Handles the AntD drawers
  const showDrawer = async (recipe) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
      );
      const data = await response.json();
      const detailedRecipe = data.meals ? data.meals[0] : null;
      setSelectedRecipe(detailedRecipe);
      setDrawerVisible(true);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const onCloseDrawer = () => {
    setSelectedRecipe(null);
    setDrawerVisible(false);
  };

  //Calls the toggleFavorite function and then displays AntD notification
  const handleRemoveFavorite = (recipe) => {
    toggleFavorite(recipe); 
    notification.error({
      message: 'Removed Favorite',
    });
  };

  //Gets the ingredients because I dont have ingredients or instructions in my firebase databased, same as breakfast.jsx basically
  const getIngredients = (recipe) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      if (recipe[ingredientKey]) {
        ingredients.push(`${recipe[ingredientKey]} - ${recipe[measureKey]}`);
      }
    }
    return ingredients;
  };

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
          <b>
            <UserInfoPop firstName={userFirstName} lastName={userLastName} />
          </b>
          {!isLoggedIn && (
            <a className="Person" href="login.jsx">
              <IonIcon icon={personOutline}></IonIcon>
            </a>
          )}
        </li>
      </div>

      <div className="favorites-container">
        {userFavorites.map((recipe) => (
          
          <Card
            key={recipe.idMeal}
            hoverable
            style={{ width: 340, height: "100%" }}
            cover={<img alt={recipe.strMeal} src={recipe.strMealThumb} />}
            actions={[
              <Button className="favorites-button" onClick={() => showDrawer(recipe)}>Show more
              </Button>,

              <Button className="favorites-button" onClick={() => handleRemoveFavorite(recipe)}>
                Remove Favorite
          {userFavorites.some((fav) => fav.idMeal === recipe.idMeal)
            ? <StarFilled /> 
            : <StarOutlined /> 
          }
        </Button>,

            ]}
          >
            <Card.Meta title={recipe.strMeal} />
          </Card>

        ))}
      </div>
      {/* Drawer for displaying detailed recipe information */}
      <Drawer
        title={
          selectedRecipe ? (
            <b>
              <span style={{ fontSize: "18px" }}>{selectedRecipe.strMeal}</span>
            </b>
          ) : (
            ""
          )
        }
        placement="right"
        onClose={onCloseDrawer}
        visible={drawerVisible}
        width={1000}
      >
        {selectedRecipe && (
          <div className="detailed-recipe">
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
            <h3>{selectedRecipe.strMeal}</h3>
            <h4 style={{ fontSize: "18px", paddingTop: "10px" }}>
              Instructions:
            </h4>
            <ul
              style={{
                fontSize: "16px",
                listStyleType: "disc",
                paddingLeft: "20px",
              }}
            >
              {selectedRecipe.strInstructions
                // Split instructions by newline characters and filter out empty steps
                .split("\n")
                .filter((step) => step.trim() !== "")
                .map((step, index) => (
                  <li key={index}>{step.trim()}</li>
                ))}
            </ul>

            <h4 style={{ fontSize: "18px", paddingBottom: "15px" }}>
              Ingredients:
            </h4>
            <ul style={{ fontSize: "16px", paddingLeft: "20px" }}>
              {getIngredients(selectedRecipe).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default Favorites;
