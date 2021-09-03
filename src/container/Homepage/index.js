import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Layout from "../../components/Layout";
import Chatarea from "../../components/Chatarea";
import Card from "../../components/UI/Card";
import Welcome from "../../components/Welcome";
import Friendlist from "../../components/Friends/Friendlist";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Redirect } from "react-router-dom";
import { userconstant, authConstant } from "../../actions/constants";
import {
  login,
  isLoggedInUser,
  ssignup,
  getrealtimeusers,
  addfriend,
  getfriends,
  getprofile,
  getchatid,
  updateMessage,
  setview,
} from "../../actions";

const Homepage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  let unsubscribe1, unsubscribe2, unsubscribe3;
  const name = `${auth.firstname} ${auth.lastname}`;
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");

  useEffect(() => {
    unsubscribe1 = dispatch(getrealtimeusers(auth.username))
      .then((unsubscribe) => {
        // console.log(unsubscribe);
        return unsubscribe;
      })
      .catch((error) => {
        // console.log(error);
      });

    unsubscribe2 = dispatch(getfriends(auth.username))
      .then((unsubscribe) => {
        // console.log(unsubscribe);
        return unsubscribe;
      })
      .catch((error) => {
        // console.log(error);
      });

    // unsubscribe3 =
    //   .then((unsubscribe) => {
    // console.log(unsubscribe);
    //     return unsubscribe;
    //   })
    //   .catch((error) => {
    // console.log(error);
    //   });
  }, []);
  useEffect(() => {
    return () => {
      //cleanup
      unsubscribe1.then((f) => f()).catch((error) => console.log(error));
      unsubscribe2.then((f) => f()).catch((error) => console.log(error));
    };
  }, []);
  // console.log("homepage");

  if (!auth.authenticated) {
    console.log("rowdy boys");
    return <Redirect to={`/`} />;
  }

  const addfriendtouser = (friendid) => {
    const user1 = auth.username;
    const user2 = friendid;
    if (user1.localeCompare(user2) == -1) {
      dispatch(addfriend(auth.username, friendid, `${user1}&${user2}`));
    } else if (user1.localeCompare(user2) == 1) {
      dispatch(addfriend(auth.username, friendid, `${user2}&${user1}`));
    }
  };
  const setchatid = (user1, user2) => {
    if (user1.localeCompare(user2) == -1) {
      dispatch({
        type: `${userconstant.SET_CHAT_ID}_SUCCESS`,
        payload: { chatid: `${user1}&${user2}` },
      });
    } else if (user1.localeCompare(user2) == 1) {
      dispatch({
        type: `${userconstant.SET_CHAT_ID}_SUCCESS`,
        payload: { chatid: `${user2}&${user1}` },
      });
    }
  };
  const chatinit = (info) => {
    // console.log("common common");
    // console.log(info);
    document.getElementById("chatlist").classList.add("d-none");
    document.getElementById("chatlist").classList.add("d-sm-block");
    document.getElementById("chatwindow").classList.remove("d-none");
    document.getElementById("chatwindow").classList.remove("d-sm-block");
    setChatStarted(true);
    setChatUser(info);
    setchatid(auth.username, info.username);
  };

  const submitMessage = (inputText, receiver) => {
    const msgobj = {
      content: inputText,
      isViewed: false,
      sender: auth.username,
      receiver: receiver,
      time: {
        sentTime: new Date(),
        seenTime: null,
      },
    };

    dispatch(updateMessage(msgobj));
  };

  return (
    <>
      <div className="d-flex flex-column container-fluid-xs w-100 h-100 overflow-y-hidden">
        <Layout addfriend={addfriendtouser} type={"home"} />
        <div className="container-fluid-xs w-100 h-100 d-flex flex-column overflow-x-scroll overflow-y-scroll hidesb ">
          <div className="row h-100" style={{ width: "101%" }}>
            <div
              className="col-12 col-sm-6 col-md-4 bg-black h-100 position-relative"
              id="chatlist"
            >
              <Friendlist init={chatinit} />
            </div>

            <div
              className="col-12 col-sm-6 col-md-8 h-100 position-relative flex-grow-1 d-none d-sm-block"
              id="chatwindow"
            >
              {chatStarted ? (
                <Chatarea user={chatUser} submitMessage={submitMessage} />
              ) : (
                <Welcome name={name} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
//
//
//
//   </div>
// </div>

export default Homepage;
