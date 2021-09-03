import React from "react";
import PropTypes from "prop-types";

const Dropdown = (props) => {
  return (
    <div className="nav-item">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle harrow bg-box border-none"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
        >
          &#8942;
        </button>
        <ul
          className="dropdown-menu dropdown-menu-dark dropdown-menu-end text-center  text-white"
          aria-labelledby="dropdownMenuButton1"
        >
          <li>
            <a
              className="dropdown-item font-weight-bold border-bottom"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
            >
              Profile
            </a>
          </li>
          <li>
            <a className="dropdown-item  border-bottom" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item " href="#">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
