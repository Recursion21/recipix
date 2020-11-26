import axios from "axios";

const searchRecipesApi = async (ingredients, tags) => {
  let baseUrl = "http://127.0.0.1:5000/recipe/search";

  const payload = {
    ingredients: ingredients.map((ingredient) => ({ name: ingredient.value })),
    tags: tags.map((tag) => ({ tag: tag })),
  };
  // console.log({ searchRecipePayload: payload });
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  return axios
    .post(baseUrl, payload, config)
    .then((response) => response)
    .catch((error) => error.response);
};

export default searchRecipesApi;
