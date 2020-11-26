import axios from "axios";

const deleteRecipeApi = async (values) => {
  let baseUrl = "http://127.0.0.1:5000/recipe/delete";
  const payload = { recipe_id: values.recipe_id };
  // console.log({deleteRecipe: payload});
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: localStorage["token"],
    },
  };
  return axios
    .post(baseUrl, payload, config)
    .then((response) => response)
    .catch((error) => error.response);
};

export default deleteRecipeApi;
