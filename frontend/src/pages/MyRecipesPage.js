import React from "react";
import getRecipeByTokenApi from "../apis/getRecipeByTokenApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import RecipeCard from "../components/RecipeCard";

const MyRecipesPage = (props) => {
  //Login check already done
  const [recipes, setRecipes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function fetchRecipes() {
      await getRecipeByTokenApi().then((response) => {
        setRecipes(response.data.recipes);
        setIsLoaded(true);
      });
    }
    fetchRecipes();
  }, []);

  if (!isLoaded) {
    return (
      <div align="center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Your Recipes</h1>
      {recipes.length === 0 && (
        <h4 style={{ textAlign: "center" }}>
          Begin creating recipes by clicking on the add recipe tab!
        </h4>
      )}
      {recipes.length !== 0 && (
        <Grid container spacing={2}>
          {recipes &&
            recipes.map((recipe) => (
              <Grid key={recipe.recipe_id} item xs={4}>
                <RecipeCard
                  title={recipe.recipe_name}
                  imagePath={recipe.image}
                  recipeId={recipe.recipe_id}
                  canEdit={true}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
};

export default MyRecipesPage;
