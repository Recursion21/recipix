import axios from "axios";

const getRequestedIngredientsApi = async (values) => {
  let baseUrl = "http://127.0.0.1:5000/req/find";
  const payload = { request_id: values.request_id };
  // console.log({getRequestedIngredients: payload});
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

export default getRequestedIngredientsApi;
