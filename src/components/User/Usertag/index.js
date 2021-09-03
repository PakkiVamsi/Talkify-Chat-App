import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";

const Usertag = (props) => {
  const auth = useSelector((state) => state.auth);
  // console.log("fcuk");
  // console.log(auth);
  const name = `${auth.firstname} ${auth.lastname}`;
  return (
    <nav class="navbar navbar-light bg-box border-bottom border-dark p-0 align-items-center w-100 ">
      <div class="container-fluid d-flex justify-content-start w-100">
        <span class="navbar-brand">
          <img
            src={
              auth.profilephoto
                ? auth.profilephoto
                : "https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png"
            }
            alt=""
            width="60px"
            height="60px"
            class="d-inline-block rounded-circle align-text-top pointer border border-2"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            aria-controls="offcanvasExample"
          />
        </span>
        <div className="nav-item text-light flex-grow-1 text-truncate overflow-hidden w-40 select-none text-uppercase lsp-1">
          <h3>{name}</h3>
        </div>
        <Dropdown />
      </div>
    </nav>
  );
};

export default Usertag;
