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
import { login, isLoggedInUser } from "../../actions/";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setmail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();
    dispatch({
      type: `${authConstant.USER_LOGIN}_FAILURE`,
      payload: { error: "" },
    });
    const user = { email, password };
    dispatch(login(user));
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

  if (auth.authenticated) {
    return <Redirect to={`/index`} />;
  }

  return (
    <>
      <Layout />
      <Card>
        <p className="text-center fs-6 fw-bold text-uppercase">{auth.error}</p>
        <div className="container bg-box border-dark border-3 border rounded-5 p-5 pb-3 hidesb">
          <div className="container text-white text-center p-2 mb-4 lsp">
            <h1>LOGIN</h1>
          </div>
          <form onSubmit={userLogin}>
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
              LOGIN
            </button>
          </form>

          <div className="mb-3 text-center ">
            <a
              className=" text-decoration-none text-uppercase font-weight-bold fs-5 p-1 rounded-3"
              style={{ color: "black", fontWeight: "500" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              href=""
            >
              Forgot Password?
            </a>
          </div>
          <ResetPassword />
        </div>

        <div className="container  border mt-4 mb-5 bg-box rounded-5 p-4 border-3 border-dark">
          <div className="text-center text-white fs-5">
            <span>
              Dont have an account?
              <NavLink
                to="/signup"
                className=" text-decoration-none text-uppercase font-weight-bold fs-5 p-1 rounded-3"
                style={{ color: "black", fontWeight: "500" }}
              >
                SIGNUP
              </NavLink>
            </span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Login;

// UNUSED CODE
// <div className="mb-2 text-center">
//   <p className="border-top lh border-white">
//     <span
//       className="text-white ps-2 pe-2"
//       style={{ backgroundColor: "#6D7CA7" }}
//     >
//       OR
//     </span>
//   </p>
// </div>
//

// <div className="mb-3 mt-4 fb text-center d-flex justify-content-around text-white fs-5 mb-0">
//   <p>
//     <img
//       className="pt"
//       src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
//       alt=""
//       height="60px"
//       width="60px"
//     />
//   </p>
//   <p>
//     <img
//       src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
//       className="pt"
//       alt=""
//       height="60px"
//       width="60px"
//     />
//   </p>
// </div>
