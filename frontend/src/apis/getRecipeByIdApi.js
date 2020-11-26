import axios from "axios";

const getRecipeByIdApi = async (values) => {
  let baseUrl = "http://127.0.0.1:5000/recipe/find";
  const payload = { recipe_id: values.recipe_id };
  // console.log({getRecipesById: payload});
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

export default getRecipeByIdApi;
