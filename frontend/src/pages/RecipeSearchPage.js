import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import searchRecipesByNameApi from "../apis/searchRecipesByNameApi";
import Grid from "@material-ui/core/Grid";
import RecipeCard from "../components/RecipeCard";
import TagFilter from "../components/TagFilter";

const RecipeSearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");
  const [tagsState, setTagsState] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      if (input !== "") {
        const response = await searchRecipesByNameApi(input, tagsState);
        setRecipes(response.data.recipes);
      }
    }
    getRecipes();
  }, [tagsState, input]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      setInput(e.target.value);
      const response = await searchRecipesByNameApi(input, tagsState);
      const data = response.data;
      setRecipes(data.recipes);
    }
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Recipe Search
      </h1>
      <TextField
        fullWidth
        id="recipeSearch"
        name="recipeSearch"
        placeholder="Search for a Recipe..."
        variant="outlined"
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <br />
      <TagFilter tagsState={tagsState} setTagsState={setTagsState} />
      <Grid container spacing={2}>
        {recipes &&
          recipes.map((recipe) => (
            <Grid key={recipe.recipe_id} item xs={4}>
              <RecipeCard
                title={recipe.recipe_name}
                imagePath={recipe.image}
                recipeId={recipe.recipe_id}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default RecipeSearchPage;
