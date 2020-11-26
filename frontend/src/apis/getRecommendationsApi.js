import axios from "axios";

const getRecommendationsApi = async (ingredients, tags) => {
  let baseUrl = "http://127.0.0.1:5000/recommend/get";
  const payload = {
    ingredients: ingredients.map((ingredient) => ({ name: ingredient.value })),
    tags: tags.map((tag) => ({ tag: tag })),
  };
  // console.log({recommendationsPayload: payload});
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

export default getRecommendationsApi;
