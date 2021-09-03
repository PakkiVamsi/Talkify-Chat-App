import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log("private");

  return (
    <Route
      {...rest}
      component={(props) => {
        const user = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user"))
          : null;

        if (user) {
          return <Component {...props} />;
        } else {
          return <Redirect to={`/`} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
