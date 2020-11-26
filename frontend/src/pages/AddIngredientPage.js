import addIngredientApi from "../apis/addIngredientApi";
import React from "react";
import { withRouter } from "react-router";
import { Formik } from "formik";
import AddIngredientForm from "./AddIngredientForm";

const AddIngredientPage = ({ history }) => {
  return (
    <Formik
      initialValues={{
        ingredient: "",
        category: "",
        valid: true,
        error_msg: "",
      }}
      onSubmit={async (values) => {
        console.log(values);
        const response = await addIngredientApi(values);
        if (values.ingredient === "") {
          values.error_msg = "Enter an Ingredient";
          values.valid = false;
        } else if (response.status === 200) {
          history.push("/");
        } else {
          values.error_msg = response.data.message;
          values.valid = false;
        }
      }}
    >
      {(props) => <AddIngredientForm {...props} />}
    </Formik>
  );
};

export default withRouter(AddIngredientPage);
