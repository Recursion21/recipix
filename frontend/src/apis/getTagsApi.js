import axios from "axios";

const getTagsApi = () => {
  let baseUrl = "http://127.0.0.1:5000/recipe/tags";

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  return axios
    .get(baseUrl, config)
    .then((response) => response)
    .catch((error) => error.response);
};

export default getTagsApi;
