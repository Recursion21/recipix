import React from "react";
import getRecipeByTokenApi from "../apis/getRecipeByTokenApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import MyRecipesPage from "./MyRecipesPage";

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const token = window.localStorage["token"];
  if (!token) {
    return <h1>Please Log In</h1>;
  }
  return <MyRecipesPage token={token} />;
};
