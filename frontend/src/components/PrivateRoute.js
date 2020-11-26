import React from "react";
import { Redirect, Route } from "react-router-dom";
import { LOGIN } from "../constants/urlConstants";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = !!window.localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <>
            <Redirect
              to={{ pathname: LOGIN, state: { from: props.location } }}
            />
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
