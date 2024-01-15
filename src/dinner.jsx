import React, { useEffect, useState } from 'react';
import CommonLayout from './RecipeLayout'; 

const baseURL = "https://www.themealdb.com/api/json/v2/1/";

const Dinner = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  const showRecipeData = async (recipeId, category) => {
    const url = `${baseURL}lookup.php?i=${recipeId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const meal = data.meals[0];

      // Update the state to store the selected recipe
      setSelectedRecipe(meal);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goBackToResults = (category) => {
    // Fetch recipes again and display results
    fetchRecipesByCategory(category);
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
    // Fetch recipes for dinner when the component mounts
    fetchRecipesByCategory("dinner");
  }, []);

  return (
    <CommonLayout title="Dinner" activeTab="dinner">
      <form onSubmit={(event) => searchForRecipes(event, 'dinner')}>
        <label htmlFor="term">Search Term:</label>
        <input id="term" type="text" placeholder="Enter a search term..." />
        <button type="submit">Search</button>
      </form>

      <div id="dinner-results" className="results-container">
        {recipes.map((recipe) => (
          <section key={recipe.idMeal}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>{recipe.strMeal}</p>
            <button onClick={() => showRecipeData(recipe.idMeal, 'dinner')}>Show more</button>
          </section>
        ))}
      </div>

      {/* Display detailed recipe information */}
      {selectedRecipe && (
        <div className="detailed-recipe">
          {/* Render detailed information here */}
          <h2>{selectedRecipe.strMeal}</h2>
          <p>{selectedRecipe.strInstructions}</p>
          {/* You can add more details as needed */}
        </div>
      )}
    </CommonLayout>
  );
};

export default Dinner;