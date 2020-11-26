import axios from "axios";

const getRecipeByTokenApi = async () => {
  let baseUrl = "http://127.0.0.1:5000/recipe/user";
  const payload = {};
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: localStorage["token"],
    },
  };
  // console.log(config);
  // console.log(localStorage["token"]);
  return axios
    .post(baseUrl, payload, config)
    .then((response) => response)
    .catch((error) => error.response);
};

export default getRecipeByTokenApi;
