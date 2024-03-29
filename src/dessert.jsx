import React, { useEffect, useState } from 'react';
import CommonLayout from './RecipeLayout'; 
import { getAuth } from "firebase/auth";
import { ref, set, child, database } from "./firebase";
import './css/pick.css'; 
import { Drawer, Card, Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const baseURL = "https://www.themealdb.com/api/json/v2/1/";

const Dessert = ({ isLoggedIn }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [favorites, setFavorites] = useState([]); 

  const toggleFavorite = async (recipe) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const favoritesRef = ref(database, `favorites/${uid}`);
    const isRecipeFavorite = favorites.includes(recipe.idMeal);
  
    if (isRecipeFavorite) {
      // Remove recipe from favorites
      await set(child(favoritesRef, recipe.idMeal), null);
      setFavorites(favorites.filter((id) => id !== recipe.idMeal));
    } else {
      // Add recipe to favorites
      await set(child(favoritesRef, recipe.idMeal), recipe);
      setFavorites([...favorites, recipe.idMeal]);
    }
  };

  const isFavorite = (recipe) => favorites.includes(recipe.idMeal);

  // Displays the recipe info once the drawer is opened, fetches it from the API endpoint
  const showDrawer = async (recipe) => {
    try {
      const response = await fetch(`${baseURL}lookup.php?i=${recipe.idMeal}`);
      const data = await response.json();
      const detailedRecipe = data.meals[0];

      //Splits the instructions up
      const instructions = detailedRecipe.strInstructions.split("\n");
      //Note to self, the "..." creates new objects and copies all the key-value pairs, and then adds a new key-value pair
      //Specifically, all key-value pairs in detailedRecipe are copied to instructions
      setSelectedRecipe({ ...detailedRecipe, instructions });
      setDrawerVisible(true);
    } catch (error) {
      console.error("Error fetching detailed recipe data:", error);
    }
  };

  // Closes the drawer
  const onCloseDrawer = () => {
    setSelectedRecipe(null);
    setDrawerVisible(false);
  };


  const fetchRecipesByCategory = async (category) => {
    const url = `${baseURL}filter.php?c=${category}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
        // Reset selectedRecipe when fetching new recipes
        setSelectedRecipe(null);
      } else {
        // Handle the case where no results are found
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(getAuth());



      //Recipe as param, loops through 20 times, to get the recipes
  //If the ingridentkey has a value, constructs string, pushes it to array
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

  const searchForRecipes = async (event, category) => {
    event.preventDefault();
    const term = event.target.elements.term.value;

    // Check if a search term is provided
    if (term) {
      try {
        const response = await fetch(`${baseURL}search.php?s=${term}`);
        const data = await response.json();

        if (data.meals) {
          setRecipes(data.meals);
          // Reset selectedRecipe when fetching new recipes
          setSelectedRecipe(null);
        } else {
          // Handle the case where no results are found
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      // Handle the case where no search term is provided
      setRecipes([]);
    }
  };



  useEffect(() => {
    // Fetch recipes for dessert when the component mounts
    fetchRecipesByCategory("dessert");
  }, []);

  return (
    <CommonLayout title="dessert" activeTab="dessert" isLoggedIn={isLoggedIn}>
      <form
        className="meal-form"
        onSubmit={(event) => searchForRecipes(event, "dessert")}
      >
        <label htmlFor="term">Search:</label>
        <input id="term" type="text" placeholder="Search for a recipe" />
        <button class="SearchButton" type="submit">
          Search
          </button>
      </form>

      <div id="dessert-results" className="results-container">
      {recipes.map((recipe) => (
          <Card
            key={recipe.idMeal}
            hoverable
            style={{ width: 300, margin: 20 }}
            cover={<img src={recipe.strMealThumb} alt={recipe.strMeal} />}
            actions={[
              <Button className="SearchButton" onClick={() => showDrawer(recipe)}>
                Show more
              </Button>,
              
                getAuth().currentUser ? (
                  <Button
                    className="SearchButton"
                    onClick={() => toggleFavorite(recipe)}
                  >
                    {isFavorite(recipe) ? (
                      <StarFilled
                        style={{ fontSize: "24px", paddingLeft: "5px" }}
                      />
                    ) : (
                      <StarOutlined
                        style={{ fontSize: "24px", paddingLeft: "5px" }}
                      />
                    )}
                  </Button>
                ) : null,
                ]}
                >
            <Card.Meta title={recipe.strMeal} />
          </Card>
        ))}
      </div>

      <Drawer
      //Renders the recipes name
        title={selectedRecipe ? <b><span style={{ fontSize: "18px"}}> {selectedRecipe.strMeal} </span> </b>: ""}
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
            <h4 style={{ fontSize: "18px", paddingTop: "10px" }}>  Instructions: </h4>
            <ul style={{fontSize:"16px", listStyleType: "disc", paddingLeft:"20px"}}>
            {selectedRecipe.instructions
            //Some steps were showing random empty bullet points, added filter to get rid of that
            .filter((step) => step.trim() !== "")
            .map((step, index) => (
              <li key={index}>{step}</li>
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
    </CommonLayout>
  );
};

export default Dessert;
