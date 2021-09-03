import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";

import { getunseen } from "../../../actions";

import "./style.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const Friendtag = (props) => {
  const name = `${props.info.firstname} ${props.info.lastname}`;
  const isonline = props.info.isOnline;
  const typing = props.info.typing;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  var unsubscribe;
  console.log(auth.username, props.info.username);
  return (
    <div
      className="border-bottom border-dark bg w-100 h-72 select-none pointer"
      onClick={() => {
        props.init(props.info);
      }}
    >
      <div className="d-flex flex-row align-items-center h-72">
        <div
          className={` ${isonline ? `bg-success` : `bg-danger`} h-100`}
          style={{ width: "15px" }}
        ></div>

        <div className=" w-72 h-72 p-1 ">
          <img
            src={
              props.info.profilephoto
                ? props.info.profilephoto
                : "https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png"
            }
            height="100%"
            width="100%"
            className="rounded-circle border border-dark border-3"
          />
        </div>
        <div className="flex-grow-1 p-2 bd-highlight text-dark">
          <h3 className="mb-0">{name}</h3>
          <h5 className="text-success mt-0 mb-0">
            {typing ? `typing...` : ``}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Friendtag;
