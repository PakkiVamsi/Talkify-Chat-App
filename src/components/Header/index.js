import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import $ from "../../../node_modules/jquery";
// import Popper from "../../../node_modules/popper.js";
// import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { NavLink, Link, Redirect } from "react-router-dom";
import { isLoggedInUser, logout } from "../../actions/";
import { useDispatch, useSelector } from "react-redux";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [friendid, setfriendid] = useState("");
  console.log(auth);

  const logoutUser = () => {
    // console.log("in logout user");
    dispatch(logout(auth.username));
  };

  // <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  //   <a className="dropdown-item" href="#">
  //     Action
  //   </a>
  //   <a>
  //     <Link
  //       to="#"
  //       onClick={() => {
  // console.log("HIiiiiiiiiiiii");
  //         dispatch(logout());
  //       }}
  //       className="nav-link text-decoration-none text-uppercase font-weight-bold"
  //     >
  //       Logout
  //     </Link>
  //   </a>
  //   <a className="dropdown-item" href="#">
  //     Another action
  //   </a>
  //   <a className="dropdown-item" href="#">
  //     Something else here
  //   </a>
  // </div>

  const handlefriendrequest = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      // console.log(friendid);
      const call = props.addfriend;
      call(friendid);
    }
  };

  return (
    <>
      <nav
        className={`navbar w-100 navbar-expand navbar-light p-1 ${
          props.type == "home" ? `` : `position-fixed`
        } bg w-100 border-dark border-bottom border-3`}
      >
        <div className="container-fluid align-items-center justify-content-between">
          <a
            className="navbar-brand lsp fs-2 select-none align-items-center"
            href="#"
            style={{ color: "black", fontWeight: "400" }}
          >
            <img
              className="rounded-circle me-2"
              src={"/images/talkify-logo.png"}
              height="100%"
              width="50px"
            />
            {!auth.authenticated && (
              <NavLink to="/" className="text-decoration-none text-dark">
                TALKIFY
              </NavLink>
            )}
            {auth.authenticated && `TALKIFY`}
          </a>

          {auth.authenticated && (
            <>
              <div className="d-flex align-self-center w-50 d-none d-sm-block">
                <input
                  className="form-control w-75"
                  type="search"
                  onKeyDown={handlefriendrequest}
                  onChange={(event) => setfriendid(event.target.value)}
                  placeholder="Add Friend"
                  aria-label="Search"
                />
              </div>

              <div className="d-flex align-items-center">
                <div className="container d-flex">
                  <ul className="navbar-nav me-auto align-items-center">
                    <li className="nav-item">
                      <NavLink
                        to="#"
                        onClick={logoutUser}
                        className="nav-link bg-white text-decoration-none text-uppercase font-weight-bold fs-6 p-1 rounded-3"
                        style={{ color: "#0096C7", fontWeight: "500" }}
                      >
                        LOGOUT
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {!auth.authenticated && (
            <>
              <div className="d-flex align-items-center">
                <ul className="navbar-nav me-auto align-items-center">
                  <li className="nav-item pe-1">
                    <NavLink
                      to="/login"
                      className="nav-link text-light text-decoration-none text-uppercase font-weight-bold fs-6"
                    >
                      LOGIN
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/signup"
                      className="nav-link bg-white text-decoration-none text-uppercase font-weight-bold fs-6 p-1 rounded-3"
                      style={{ color: "#0096C7", fontWeight: "500" }}
                    >
                      SIGNUP
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
      {auth.authenticated && (
        <div className="container-xs-fluid bg-box h-auto m-auto align-items-center w-100 d-sm-none">
          <div className="row h-auto m-auto w-100">
            <div className="col container h-auto py-1 px-2 m-auto w-100">
              <div className="d-flex align-self-center w-100 m-auto justify-content-center">
                <input
                  className="form-control w-100"
                  type="search"
                  onKeyDown={handlefriendrequest}
                  onChange={(event) => setfriendid(event.target.value)}
                  placeholder="Add Friend"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
