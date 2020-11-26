import axios from "axios";

const loginApi = async (values) => {
  let baseUrl = "http://127.0.0.1:5000/auth/login";
  const payload = { username: values.username, password: values.password };
  // console.log({loginPaylod: payload});
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

export default loginApi;
