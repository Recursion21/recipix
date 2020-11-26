import React from "react";
import { Formik } from "formik";
import SignUpForm from "./SignUpForm";
import signUpApi from "../apis/signUpApi";
import { withRouter } from "react-router";
import { HOME_PAGE } from "../constants/urlConstants";

const SignUpPage = ({ history }) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values) => {
        const response = await signUpApi(values);
        if (response.status === 200) {
          window.localStorage.setItem("token", response.data.token);
          history.push(HOME_PAGE);
        } else if (response.status === 409) {
          values.error = "Username taken";
        } else {
          values.error = "Please enter username and password";
        }
      }}
    >
      {(props) => <SignUpForm {...props} />}
    </Formik>
  );
};

export default withRouter(SignUpPage);
