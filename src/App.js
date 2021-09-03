import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import Homepage from "./container/Homepage";
import Login from "./container/Login";
import Signup from "./container/Signup";
import Welcome from "./container/Welcome";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { isLoggedInUser } from "./actions/";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hey here");
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, [auth.authenticated]);

  return (
    <Router>
      <PrivateRoute path="/index" exact component={Homepage} />
      <Route path="/" exact component={Welcome} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </Router>
  );
}

export default App;
