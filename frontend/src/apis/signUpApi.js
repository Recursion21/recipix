import axios from "axios";

const signUpApi = async (values) => {
  let baseUrl = "http://127.0.0.1:5000/auth/register";

  const payload = { username: values.username, password: values.password };

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

export default signUpApi;
