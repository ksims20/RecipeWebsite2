import React, { useEffect, useState } from 'react';
import CommonLayout from './RecipeLayout';
import './css/pick.css'; 
import { Drawer } from 'antd';

const baseURL = "https://www.themealdb.com/api/json/v2/1/";

const Lunch = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Displays the recipe info once the drawer is opened, fetches it from the API endpoint
  const showDrawer = async (recipe) => {
    try {
      const response = await fetch(`${baseURL}lookup.php?i=${recipe.idMeal}`);
      const data = await response.json();
      const detailedRecipe = data.meals[0];
      setSelectedRecipe(detailedRecipe);
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
    // Fetch recipes for lunch when the component mounts
    fetchRecipesByCategory("lunch");
  }, []);

  return (
    <CommonLayout title="lunch" activeTab="lunch">
      <form
        className="meal-form"
        onSubmit={(event) => searchForRecipes(event, "lunch")}
      >
        <label htmlFor="term">Search:</label>
        <input id="term" type="text" placeholder="Search for a recipe" />
        <button class="SearchButton" type="submit">Search</button>
      </form>

      <div id="lunch-results" className="results-container">
        {recipes.map((recipe) => (
          <section key={recipe.idMeal}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>{recipe.strMeal}</p>
            <button class="SearchButton" onClick={() => showDrawer(recipe)}>Show more</button>
          </section>
        ))}
      </div>

      <Drawer
      //Renders the recipes name
        title={selectedRecipe ? <b><span style={{ fontSize: "18px"}}> {selectedRecipe.strMeal} </span> </b>: ""}
        placement="right"
        onClose={onCloseDrawer}
        visible={drawerVisible}
        width={600}
      >
        {selectedRecipe && (
          <div className="detailed-recipe">
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
            <h3>{selectedRecipe.strMeal}</h3>
            <h4 style={{ fontSize: "18px", paddingTop: "10px"}}>Instructions:</h4>
            <p style={{ fontSize: "16px", paddingTop: "10px", paddingBottom: "15px" }}>
              {selectedRecipe.strInstructions}
            </p>
            <h4 style={{ fontSize: "18px", paddingBottom: "15px" }}>
              Ingredients:
            </h4>
            <ul style={{ fontSize: "16px" }}>
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

export default Lunch;
