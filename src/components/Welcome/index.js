import React from "react";
import PropTypes from "prop-types";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const Welcome = (props) => {
  return (
    <div
      className="h-100 d-flex flex-column bg-box justify-content-center align-items-center position-relative select-none text-uppercase"
      style={{ marginLeft: "-10px", marginRight: "-12px" }}
    >
      <div className="row text-center text-light ">
        <div style={{ fontSize: "4rem" }}>Welcome , {props.name}</div>
      </div>
      <div className="row text-light">
        <div className="fs-4">
          Get Connected With{" "}
          <span className="fs-1 fw-bold text-dark lsp">TALKIFY</span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
