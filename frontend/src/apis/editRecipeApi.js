import axios from "axios";
import { mapArrayToTagsObject } from "../utils/Mappers";

// mapTags = (tags) => {};

const editRecipeApi = async (values, id, setError) => {
  let baseUrl = "http://127.0.0.1:5000/recipe/edit";

  const payload = {
    recipe_id: id,
    recipe_name: values.recipeName,
    image: values.image,
    tags: mapArrayToTagsObject(values.tags),
    ingredients: values.ingredients,
    servings: values.servings,
    method: values.instructions,
    description: values.description,
  };
  // console.log({ editRecipe: payload });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
      Accept: "application/json",
    },
  };

  return axios
    .post(baseUrl, payload, config)
    .then((response) => response)
    .catch((error) => error.response);
};

export default editRecipeApi;
