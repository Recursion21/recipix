import axios from "axios";

const addIngredientApi = async (values) => {
  let baseUrl = "http://127.0.0.1:5000/ingredients/add";
  const payload = { name: values.ingredient, category: values.category.label };

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

export default addIngredientApi;
