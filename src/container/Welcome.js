import React from "react";

import PropTypes from "prop-types";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { NavLink, Link, Redirect } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";

const Welcome = () => {
  // console.log("Login page");
  const auth = useSelector((state) => state.auth);
  if (auth.authenticated) {
    return <Redirect to={`/index`} />;
  }

  return (
    <>
      <Layout />
      <div className="container-xs-fluid pt-5 bg h-100 m-auto align-items-center overflow-hidden w-100 hidesb">
        <div className="row pt-5 h-fit z-index-1 m-auto overflow-hidden position-fixed w-100 ">
          <div className=" container col-md-7 col-lg-6 col-xl-5 h-100">
            <div className="container rounded-5 p-5 mt-5 bg-transparent">
              <div className="container  text-white text-center p-2 mb-0">
                <img
                  className="rounded-circle effect"
                  src={"/images/talkify-logo.png"}
                  height="100%"
                  width="200px"
                />
              </div>
              <div className="container text-white justify-content-center text-center p-0 mb-0 w-100 ">
                <span
                  className="lsp text-center"
                  style={{
                    color: "black",
                    fontWeight: "300",
                    fontSize: "calc(3rem + 1.5vw)",
                  }}
                >
                  TALKIFY
                </span>
              </div>
              <div
                className="text-center lsp-1"
                style={{
                  fontFamily: "verdana",
                  color: "black",
                  fontStyle: "bold",
                }}
              >
                Chatify with Talkify
              </div>
            </div>
          </div>
        </div>
        <div className=" pb-0 h-auto bg-ft m-auto z-index-4 position-absolute w-100 top-100 overflow-x-hidden">
          <div className=" w-100 text-center">
            <div
              className="mb-1 lsp-1 py-5 fw-light text-light"
              style={{
                fontSize: "calc(1.5rem + 1vw)",
              }}
            >
              FEATURES OF TALKIFY
            </div>
            <div className="mx-4 px-4 row row-cols-1 row-cols-md-2 row-cols-lg-4 text-light pb-5 pt-4 g-4 border border rounded-5 ">
              <div className="col">
                <div className="p-3 tag bg rounded-pill bg-dark fs-3">
                  Authentication
                </div>
              </div>
              <div className="col">
                <div className="p-3 tag bg rounded-pill bg-dark fs-3">
                  Add Friend
                </div>
              </div>
              <div className="col">
                <div className="p-3 tag bg rounded-pill bg-dark fs-3">
                  Private 1-1 Chatting
                </div>
              </div>

              <div className="col">
                <div className="p-3 tag bg rounded-pill bg-dark fs-3">
                  Typing Indicators
                </div>
              </div>

              <div className="col">
                <div className="p-3 tag bg rounded-pill bg-dark fs-3">
                  Read Receipts
                </div>
              </div>

              <div className="col">
                <div className="p-3 tag bg rounded-pill bg-dark fs-3">
                  Online Indicators
                </div>
              </div>
              <div className="col">
                <div className="p-3 tag bg rounded-pill bg-dark fs-3">
                  Friend List
                </div>
              </div>

              <div className="col">
                <div className="p-3 tag bg rounded-pill bg-dark fs-3">
                  Conversations List
                </div>
              </div>
            </div>

            <div className="container w-100 h-100 m-auto mb-2 py-4">
              <div className="p-4 mt-2 bg-transparent m-auto">
                <div
                  className="text-center text-light m-auto"
                  style={{
                    fontFamily: "verdana",
                    fontStyle: "bold",
                  }}
                >
                  <span className="lsp-1 fs-2">CONTACT US</span>
                </div>

                <div className="text-light mt-1 bg text-dark fw-bold w-100">
                  <p>vamsipakki22@gmail.com / +919777617554</p>
                </div>
              </div>
            </div>
            <div className="container-xs-fluid w-100 h-100 bg-dark text-dark mb-0 lsp-1 bg">
              <h2>COPYRIGHT &copy; TALKIFY</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
