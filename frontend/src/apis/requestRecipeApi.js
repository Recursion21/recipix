import axios from "axios";

const requestRecipeApi = async (ingredients) => {
  let baseUrl = "http://127.0.0.1:5000/req/request";

  const payload = {
    ingredients: ingredients.map((ingredient) => ({ name: ingredient.value })),
  };

  // console.log({ requestRecipePayload: payload });
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

export default requestRecipeApi;
