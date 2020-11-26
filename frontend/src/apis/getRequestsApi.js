import axios from "axios";

const getRequestsApi = () => {
  let baseUrl = "http://127.0.0.1:5000/req/all";

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

export default getRequestsApi;
