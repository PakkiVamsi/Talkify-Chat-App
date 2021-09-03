import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { userconstant, authConstant } from "../../../actions/constants";
import { useDispatch, useSelector, connect } from "react-redux";
import $ from "jquery";
import { sendPasswordResetEmail } from "../../../actions";
const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const [email, setmail] = useState("");
  const auth = useSelector((state) => state.auth);
  const handlemail = (event) => {
    dispatch({
      type: `${authConstant.USER_LOGOUT}_FAILURE`,
      payload: { error: "" },
    });
    setmail(event.target.value);
  };
  const handlesend = (event) => {
    event.preventDefault();

    dispatch(sendPasswordResetEmail(email));
  };
  const handleClose = () => {
    setmail("");
    dispatch({
      type: `${authConstant.USER_LOGOUT}_FAILURE`,
      payload: { error: "" },
    });
  };
  return (
    <>
      <form onSubmit={handlesend}>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Reset Password
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  onClick={handleClose}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body ">
                <div className="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={handlemail}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="d-flex mt-3 justify-content-between flex-row">
                  <p className="text-center fs-6 fw-bold text-uppercase">
                    {auth.error}
                  </p>
                  <button type="submit" class="bg text-dark btn btn-primary ">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
