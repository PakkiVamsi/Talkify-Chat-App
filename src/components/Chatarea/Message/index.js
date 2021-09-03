import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const Message = (props) => {
  const date = props.chat.time.sentTime.toDate();
  const suffix = date.getHours() >= 12 ? "PM" : "AM";
  const hours = ((date.getHours() + 11) % 12) + 1;
  const timetag = hours + ":" + date.getMinutes() + " " + suffix;

  if (props.auth.username == props.chat.sender) {
    return (
      <div className="d-flex justify-content-end py-1 text-align-right me-sm-4">
        <div
          key={props.index}
          style={{ backgroundColor: "#023E7D" }}
          className="d-flex flex-column badge1 text-light p-2 mw-40 text-wrap text-align-left fs-6 text-break"
        >
          <div className="text-align-left">{props.chat.content}</div>
          <div className="d-flex justify-content-end mb-0">
            <p className="fw-lighter pe-1 mb-0" style={{ fontSize: "14px" }}>
              {timetag}
            </p>
            <span
              className={props.chat.isViewed ? `text-light` : `text-b`}
              style={{
                marginRight: "-4px",
                fontSize: "12px",
              }}
            >
              ✓
            </span>
            <span
              className={props.chat.isViewed ? `text-light` : `text-b`}
              style={{ fontSize: "12px" }}
            >
              ✓
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-start py-1 text-align-left ms-2 mb-3 ms-sm-4">
        <div
          key={props.index}
          style={{ backgroundColor: "#283048" }}
          className="badge1 text-white p-2 mw-40 text-wrap  fs-6 text-break text-align-left"
        >
          <div className="text-align-left">{props.chat.content}</div>
          <p
            className="d-flex mb-0 justify-content-end fw-lighter"
            style={{ fontSize: "14px" }}
          >
            {timetag}
          </p>
        </div>
      </div>
    );
  }
};
export default Message;
