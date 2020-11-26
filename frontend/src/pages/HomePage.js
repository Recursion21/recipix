import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TagFilter from "../components/TagFilter";
import RecipeCard from "../components/RecipeCard";
import searchRecipesApi from "../apis/searchRecipesApi";
import requestRecipeApi from "../apis/requestRecipeApi";
import getIngredientsApi from "../apis/getIngredientsApi";
import getRecommendationsApi from "../apis/getRecommendationsApi";
import RecommendationChip from "../components/RecommendationChip";
import IngredientSearchBar from "../components/IngredientSearchBar";
import { mapToOptions } from "../utils/Mappers";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [tagsState, setTagsState] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [open, setOpen] = useState(false);

  const signedIn = !!window.localStorage.getItem("token");

  useEffect(() => {
    async function fetchIngredients() {
      const response = await getIngredientsApi();
      setIngredients(mapToOptions(response.data.categories));
    }
    fetchIngredients();
  }, []);

  useEffect(() => {
    async function fetchRecipes() {
      if (ingredientsList.length > 0) {
        console.log(ingredientsList);
        const response = await searchRecipesApi(ingredientsList, tagsState);
        setRecipes(response.data.recipes);
      } else {
        setRecipes([]);
      }
    }
    async function fetchRecommendations() {
      if (ingredientsList.length > 0) {
        const response = await getRecommendationsApi(
          ingredientsList,
          tagsState
        );
        setRecommendations(response.data.ingredients);
      }
    }
    fetchRecipes();
    fetchRecommendations();
  }, [tagsState, ingredientsList]);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleIngredientChange = (currentList) => {
    if (!!currentList) {
      setIngredientsList(currentList);
    } else {
      setIngredientsList([]);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>ADD INGREDIENTS, GET RECIPES</h1>
      <IngredientSearchBar
        isMulti={true}
        closeMenuOnSelect={false}
        options={ingredients}
        value={ingredientsList}
        onChange={(currentList) => handleIngredientChange(currentList)}
      />
      <TagFilter tagsState={tagsState} setTagsState={setTagsState} />
      <RecommendationChip
        ingredientsList={ingredientsList}
        recommendations={recommendations}
        setIngredientsList={setIngredientsList}
        setRecommendations={setRecommendations}
      ></RecommendationChip>
      <Grid
        container
        spacing={2}
        alignItems="flex-start"
        justify="flex-end"
        direction="row"
      >
        <Grid item>
          <Link href="/add-ingredient" variant="body2">
            {"Don't see an ingredient? Add an ingredient"}
          </Link>
        </Grid>
      </Grid>

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
      {ingredientsList.length !== 0 && signedIn && (
        <Grid container justify="center" style={{ paddingTop: "20px" }}>
          <Button
            style={{ align: "center" }}
            color="inherit"
            onClick={async () => {
              const response = await requestRecipeApi(ingredientsList);
              if (response.status === 200) {
                setOpen(true);
                setIngredientsList([]);
              }
            }}
          >
            Request a Recipe for Your Ingredients
          </Button>
        </Grid>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Recipe Request Created"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};
export default HomePage;
