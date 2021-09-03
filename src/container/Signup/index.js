import React from "react";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { userconstant, authConstant } from "../../actions/constants";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import { NavLink, Link, Redirect } from "react-router-dom";
import ResetPassword from "../../components/Settings/ResetPassword";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { signup, isLoggedInUser } from "../../actions/";
import { useDispatch, useSelector, connect } from "react-redux";
import firebase from "firebase";

const Signup = (props) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [email, setmail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const registerUser = (event) => {
    event.preventDefault();
    const user = { firstname, lastname, email, password, username };
    dispatch(signup(user));
  };

  if (auth.authenticated) {
    return <Redirect to={`/`} />;
  }

  const handlefirstname = (event) => {
    dispatch({
      type: `${authConstant.USER_LOGIN}_FAILURE`,
      payload: { error: "" },
    });
    setfirstname(event.target.value);
  };
  const handlelastname = (event) => {
    dispatch({
      type: `${authConstant.USER_LOGIN}_FAILURE`,
      payload: { error: "" },
    });
    setlastname(event.target.value);
  };
  const handleusername = (event) => {
    dispatch({
      type: `${authConstant.USER_LOGIN}_FAILURE`,
      payload: { error: "" },
    });
    setusername(event.target.value);
  };
  const handlemail = (event) => {
    dispatch({
      type: `${authConstant.USER_LOGIN}_FAILURE`,
      payload: { error: "" },
    });
    setmail(event.target.value);
  };
  const handlepassword = (event) => {
    dispatch({
      type: `${authConstant.USER_LOGIN}_FAILURE`,
      payload: { error: "" },
    });
    setpassword(event.target.value);
  };

  return (
    <Layout link="Signup">
      <Card>
        <p className="text-center fs-6 fw-bold text-uppercase ">{auth.error}</p>
        <div className="container bg-box rounded-5 p-5 pb-3 border border-3 border-dark hidesb">
          <div className="container text-white text-center p-2 mb-4 lsp">
            <h1>SIGN UP</h1>
          </div>
          <form onSubmit={registerUser}>
            <div className="form-group mb-4">
              <input
                type="text"
                value={firstname}
                onChange={handlefirstname}
                className="form-control"
                id="exampleInputfirstname"
                placeholder="First Name"
                required
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                value={lastname}
                onChange={handlelastname}
                className="form-control"
                id="exampleInputlastname"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                value={username}
                onChange={handleusername}
                className="form-control"
                id="exampleInputusername"
                placeholder="User Name"
                required
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="email"
                value={email}
                onChange={handlemail}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                value={password}
                onChange={handlepassword}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="mb-4 btn w-100 fw-bold bg-bt text-light border lsp-1"
            >
              SIGNUP
            </button>
          </form>

          <div className="mb-3 text-center ">
            <a
              className=" text-decoration-none text-uppercase font-weight-bold fs-5 p-1 rounded-3 "
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{ color: "black", fontWeight: "500" }}
              href=""
            >
              Forgot Password?
            </a>
          </div>
          <ResetPassword />
        </div>

        <div className="container mt-4 bg-box rounded-5 p-4 border border-3 border-dark">
          <div className="text-center text-white fs-5">
            <span>
              Have an account?&nbsp;
              <NavLink
                to="/login"
                className="text-decoration-none text-uppercase font-weight-bold fs-5 p-1 rounded-3"
                style={{ color: "black", fontWeight: "500" }}
              >
                LOGIN
              </NavLink>
            </span>
          </div>
        </div>
      </Card>
    </Layout>
  );
};
export default Signup;

// UNUSED CODE

// <div className="mb-2 text-center">
//   <p className="border-top lh border-white">
//     <span
//       className="text-white ps-2 pe-2 "
//       style={{ backgroundColor: "#6D7CA7" }}
//     >
//       OR
//     </span>
//   </p>
// </div>

// <div className="mb-3 fb text-center d-flex justify-content-around text-white fs-5 mb-0 ">
//   <p>
//     <img
//       name="facebook"
//       className="pt"
//       src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
//       alt=""
//       height="60px"
//       width="60px"
//     />
//   </p>
//   <p>
//     <img
//       name="google"
//       className="pt"
//       src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
//       alt=""
//       height="60px"
//       width="60px"
//     />
//   </p>
// </div>
