import axios from "axios";

const searchRecipesByNameApi = async (recipeName, tags) => {
  let baseUrl = "http://127.0.0.1:5000/recipe/searchName";

  const payload = {
    search_term: recipeName,
    tags: tags.map((tag) => ({ tag: tag })),
  };
  // console.log({recipesByName: payload});
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

export default searchRecipesByNameApi;
