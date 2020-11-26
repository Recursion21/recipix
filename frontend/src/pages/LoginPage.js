import React from "react";
import { Formik } from "formik";
import LoginForm from "./LoginForm";
import loginApi from "../apis/loginApi";
import { withRouter } from "react-router";

const SignIn = ({ history }) => {
  //const [invalid, setInvalid] = useState(false);
  return (
    <Formik
      initialValues={{ username: "", password: "", valid: true }}
      onSubmit={async (values) => {
        const response = await loginApi(values);
        // console.log({loginResponse: response});
        if (response.status === 200) {
          window.localStorage.setItem("token", response.data.token);
          history.push("/");
        } else {
          values.valid = false;
        }
      }}
    >
      {(props) => <LoginForm {...props} />}
    </Formik>
  );
};

export default withRouter(SignIn);
