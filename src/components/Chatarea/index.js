import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Chattag from "./Chattag";
import Message from "./Message";
import $ from "jquery";
import Picker from "emoji-picker-react";
import ReactScrollableFeed from "../../../node_modules/react-scrollable-feed";
import "./style.css";
import { useDispatch, useSelector, connect } from "react-redux";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { getrealtimeConversations, setTyping } from "../../actions";

const Chatarea = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [message, setmessage] = useState("");
  const [emojistatus, setemojistatus] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const friends = user.friends;
  const chatuser = [];
  const chats = user.conversations;

  const emojipickerstyle = {
    width: "100%",
    backgroundColor: "#283048",
  };

  console.log(user.chatid);
  var unsubscribe;
  useEffect(() => {
    $(document).ready(() => {
      $("#messages").animate({ scrollTop: 100000000000000 }, 500);
    });
  });
  useEffect(() => {
    console.log(chatuser);
    $(document).ready(() => {
      $("#messages").animate({ scrollTop: 100000000000000 }, 500);
    });
    unsubscribe = dispatch(
      getrealtimeConversations(
        auth.username,
        chatuser["0"].username,
        user.chatid
      )
    )
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch();
  }, [user.chatid]);
  useEffect(() => {
    return () => {
      unsubscribe
        .then((f) => {
          f();
          console.log("unsubscribed");
        })
        .catch((error) => console.log(error));
    };
  }, [user.chatid]);
  friends.forEach((value) => {
    if (value.uid == props.user.uid) chatuser.push(value);
  });
  const HandleEnter = (e) => {
    if (e.key == "Enter") {
      $(document).ready(() => {
        $("#messages").animate({ scrollTop: 10000000000 }, 500);
      });
      if (e.target.value.trim() != "")
        props.submitMessage(e.target.value, chatuser["0"].username);
      setmessage("");
    }
  };
  const Handlechange = (event) => {
    setmessage(event.target.value);
    if (event.target.value === "") {
      dispatch(setTyping(false, auth.username));
    } else {
      dispatch(setTyping(true, auth.username));
    }
  };
  $("#inputmessage").blur(function () {
    dispatch(setTyping(false, auth.username));
  });

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(emojiObject.emoji.toString());
    setmessage(message + emojiObject.emoji.toString());
  };

  return (
    <div className="h-100 d-flex flex-column">
      <div className="row position-relative d-flex align-items-center bs">
        <Chattag user={chatuser["0"]} />
      </div>
      <div
        className="row position-relative flex-grow-1 flex-shrink-1 border-start border-2 flex-basis-0  "
        style={{
          backgroundImage: `url(
          "  https://firebasestorage.googleapis.com/v0/b/talkify-54db0.appspot.com/o/images%2FDesktop.jpg?alt=media&token=167f0480-bf55-484c-8d05-fe768b54f079"
          )`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          id="messages"
          className="text-black position-absolute top-0 bs d-flex flex-direction-column w-100 h-100  overflow-x-hidden overflow-y-scroll hidesb"
        >
          <div className="flex-grow-0 flex-shrink-0 flex-basis-auto w-100">
            {user.chatid &&
              chats.map((chat, index) => {
                return <Message auth={auth} index={index} chat={chat} />;
              })}
          </div>
        </div>
      </div>
      {emojistatus && (
        <>
          <Picker
            pickerStyle={emojipickerstyle}
            preload="false"
            onEmojiClick={onEmojiClick}
          />
        </>
      )}
      <div className="row position-relative align-items-center bs">
        <nav class="d-flex bg-box border-start border-2 p-2 align-items-center w-100 justify-content-start">
          <div className="ps-3 pe-3">
            <img
              className="cursor-pointer"
              src={"/images/smile.png"}
              height="100%"
              width="35px"
              onClick={() => setemojistatus(!emojistatus)}
            />
          </div>
          <div className="pe-3">
            <img src={"/images/link.png"} height="100%" width="30px" />
          </div>

          <div class="rounded-circle flex-grow-1">
            <input
              autoComplete="off"
              type="text"
              value={message}
              onKeyDown={HandleEnter}
              id="inputmessage"
              onChange={Handlechange}
              class="form-control rounded-pill border-2 text-wrap text-break"
              placeholder="Type a message"
              aria-label="message"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="ps-3 pe-1"></div>
        </nav>
      </div>
    </div>
  );
};

export default Chatarea;
