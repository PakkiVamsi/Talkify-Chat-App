import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Friendtag from "../Friendtag";
import Usertag from "../../User/Usertag";
import "./style.css";
import { setprofilephoto } from "../../../actions/";
import { useDispatch, useSelector, connect } from "react-redux";
import firebase from "firebase";
import Profile from "../../Settings/Profile";
const Friendlist = (props) => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [img, setimg] = useState(null);
  const friends = user.friends;
  const name = `${auth.firstname} ${auth.lastname}`;

  const onFileChange = (event) => {
    if (
      event.target.files[0] &&
      event.target.files[0].type.substring(0, 5) === "image"
    ) {
      setimg(event.target.files[0]);
    } else return;

    const image = event.target.files[0];
    const uploadTask = firebase
      .storage()
      .ref(`profilephotos/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        // console.log(error);
      },
      () => {
        firebase
          .storage()
          .ref("profilephotos")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // console.log(url);
            dispatch(setprofilephoto(auth.username, url));
          });
      }
    );
  };
  console.log(friends);
  return (
    <div className="h-100 position-relative d-flex flex-column">
      <Profile action={onFileChange} auth={auth} />
      <div className="row position-relative d-flex align-items-center bs">
        <Usertag />
      </div>
      <div className="row position-relative flex-grow-1 flex-shrink-1 bg flex-basis-0  ">
        <div className="text-black position-absolute top-0 bs d-flex flex-direction-column w-100 h-100  overflow-x-hidden overflow-y-scroll hidesb">
          <div className="flex-grow-0 flex-shrink-0 flex-basis-auto w-100">
            {friends.map((value, index) => {
              return <Friendtag init={props.init} info={value} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friendlist;
