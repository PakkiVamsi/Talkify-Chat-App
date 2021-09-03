import React from "react";
import PropTypes from "prop-types";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { NavLink, Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="container-xs-fluid py-5 bg h-auto m-auto align-items-center w-100">
      <div className="row pt-5 pb-5 h-auto z-index-1 m-auto w-100">
        <div className=" container col-md-7 col-lg-6 col-xl-4 h-auto pb-5 pt-5">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Card;
