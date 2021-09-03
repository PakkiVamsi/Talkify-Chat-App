import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import "font-awesome/css/font-awesome.min.css";

const Chattag = (props) => {
  var lastseen;
  const setLastseen = () => {
    // console.log("called");
    const date1 = props.user.lastseen.toDate();
    const date2 = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const diffHours = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60));
    const diffDays = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    // console.log(diffHours);
    // console.log(diffDays);

    if (date1.toDateString() == date2.toDateString()) {
      if (date1.getHours() <= 12) {
        lastseen = `today at ${date1
          .getHours()
          .toString()}:${date1.getMinutes().toString().padStart(2, "0")} AM`;
      } else {
        lastseen = `today at ${(
          date1.getHours() - 12
        ).toString()}:${date1.getMinutes().toString().padStart(2, "0")} PM`;
      }
    } else if (
      date1.getYear() == date2.getYear() &&
      date1.getMonth() == date1.getMonth() &&
      date1.getDate() + 1 == date2.getDate()
    ) {
      {
        if (date1.getHours() <= 12) {
          lastseen = `on yesterday at ${date1.getHours()} :${date1
            .getMinutes()
            .toString()
            .padStart(2, "0")} AM`;
        } else {
          lastseen = `on yesterday at ${
            date1.getHours() - 12
          } :${date1.getMinutes().toString().padStart(2, "0")} PM`;
        }
      }
    } else if (diffDays <= 8) lastseen = `on ${days[date1.getDay()]}`;
    else lastseen = `on ${date1.toDateString()}`;
  };
  // console.log(props.user.lastseen);
  if (props.user.lastseen != null) setLastseen();
  const name = `${props.user.firstname} ${props.user.lastname}`;
  const HandleBack = () => {
    document.getElementById("chatlist").classList.remove("d-none");
    document.getElementById("chatlist").classList.remove("d-sm-block");
    document.getElementById("chatwindow").classList.add("d-none");
    document.getElementById("chatwindow").classList.add("d-sm-block");
  };
  return (
    <nav class="navbar navbar-light bg-box p-0 border-bottom border-start border-start-1 border-light  border-1 border-light align-items-center w-100 ">
      <div class="container-fluid d-flex justify-content-start w-100">
        <div className="d-sm-none">
          <i
            className="fa fa-arrow-left text-light pe-2 cursor-pointer"
            onClick={HandleBack}
          ></i>
        </div>
        ;
        <span class="navbar-brand">
          <img
            src={
              props.user.profilephoto
                ? props.user.profilephoto
                : "https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png"
            }
            alt=""
            width="60px"
            height="60px"
            class="d-inline-block rounded-circle align-text-top pointer border"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            aria-controls="offcanvasExample"
          />
        </span>
        <div className="nav-item d-flex flex-column text-light  text-truncate overflow-hidden w-40 select-none">
          <h4 className="mt-0 mb-0">{name}</h4>
          <h6 className="mt-0 mb-0">
            {props.user.typing
              ? `typing...`
              : props.user.isOnline
              ? `online`
              : `last seen ${lastseen}`}
          </h6>
        </div>
      </div>
    </nav>
  );
};

export default Chattag;
