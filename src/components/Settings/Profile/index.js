import React from "react";
import PropTypes from "prop-types";
import "./style.css";
const Profile = (props) => {
  const auth = props.auth;
  const name = `${auth.firstname} ${auth.lastname}`;
  return (
    <div
      class="offcanvas bg position-absolute offcanvas-start w-100 overflow-y-scroll hidesb"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header hidesb bg-box pt-5 text-white">
        <h4 class="offcanvas-title text-center fs-3" id="offcanvasExampleLabel">
          Profile
        </h4>

        <button
          type="button"
          class="btn-close text-white btn btn-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body hidesb mt-5 text-center">
        <div className="text-center">
          <img
            src={
              auth.profilephoto
                ? auth.profilephoto
                : "https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png"
            }
            alt=""
            width="250px"
            height="250px"
            class="d-inline-block rounded-circle align-text-top border border-dark border-5"
          />
          <ul
            className="text-center text-white me-4"
            style={{ listStyleType: "none" }}
          >
            <li>
              <input
                type="file"
                accept=".jpg , .jpeg , .png"
                id="imgupload"
                style={{ display: "none", listStyleType: "none" }}
                onChange={props.action}
              />

              <a
                className="dropdown-item bg-transparent text-center cursor-pointer fs-5"
                onClick={function () {
                  document.getElementById("imgupload").click();
                }}
              >
                Change photo
              </a>
            </li>
          </ul>
        </div>
        <div style={{ marginTop: "100px" }}>
          <h4 className="text-center text-dark fs-2 text-uppercase lsp-1">
            {name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;
