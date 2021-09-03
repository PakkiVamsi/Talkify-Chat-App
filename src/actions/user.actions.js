import React from "react";
import PropTypes from "prop-types";
import { userconstant, authConstant } from "./constants";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
export const setprofilephoto = (username, photourl) => {
  return async (dispatch) => {
    // console.log("dengey");
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .updateProfile({
            photoURL: photourl,
          })
          .then(() => {
            db.collection("users")
              .doc(username)
              .update({
                profilephoto: photourl,
              })
              .then(() => {
                let loggedInUser = JSON.parse(localStorage.getItem("user"));
                loggedInUser.profilephoto = photourl;
                localStorage.setItem("user", JSON.stringify(loggedInUser));

                dispatch({
                  type: `${authConstant.SET_PROFILE_PHOTO}_SUCCESS`,
                  payload: { photoURL: photourl },
                });
              });
            // console.log("Update successful");
          })
          .catch((error) => {
            // console.log(error);
          });
      } else {
        // console.log(user);
      }
    });
  };
};

export const setTyping = (status, username) => {
  return async (dispatch) => {
    const db = firebase.firestore().collection("users");
    db.doc(username).update({
      typing: status,
    });
  };
};

export const addfriend = (username, friendid, chatid) => {
  return async (dispatch) => {
    // console.log("adding friend inside ");
    dispatch({ type: `${userconstant.ADD_FRIEND}_REQUEST` });
    const db = firebase.firestore().collection("users");
    const usernewfriendlist = {
      friends: firebase.firestore.FieldValue.arrayUnion(friendid),
    };
    const friendnewfriendlist = {
      friends: firebase.firestore.FieldValue.arrayUnion(username),
    };
    db.doc(username).update(usernewfriendlist);
    db.doc(friendid).update(friendnewfriendlist);

    firebase
      .firestore()
      .collection("conversations")
      .doc(chatid)
      .set({ messages: [] })
      .then((docref) => {})
      .catch((error) => {});
  };
};

export const getrealtimeusers = (username) => {
  return async (dispatch) => {
    dispatch({ type: `${userconstant.GET_REALTIME_USERS}_REQUEST` });
    const db = firebase.firestore();
    const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().username != username) {
          users.push(doc.data());
        }
      });
      dispatch({
        type: `${userconstant.GET_REALTIME_USERS}_SUCCESS`,
        payload: { users },
      });
      // console.log(users);
    });

    return unsubscribe;
  };
};

export const getprofile = (username) => {
  return async (dispatch) => {
    // console.log("yoyoooo");

    const db = firebase.firestore();

    const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
      var profilephoto = "";
      querySnapshot.forEach((doc) => {
        if (doc.data().username == username) {
          profilephoto = doc.data().profilephoto;
        }
      });

      // console.log(profilephoto);

      dispatch({
        type: `${authConstant.SET_PROFILE_PHOTO}_SUCCESS`,
        payload: { photoURL: profilephoto },
      });
    });

    return unsubscribe;
  };
};

export const getfriends = (username) => {
  return async (dispatch) => {
    // console.log("hiiiiiiiiiiiiiii");

    // console.log("yoyo");

    dispatch({ type: `${userconstant.GET_FRIENDS}_REQUEST` });
    const db = firebase.firestore();
    const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
      var friends = [];
      var profilephoto;
      querySnapshot.forEach((doc) => {
        if (doc.data().username == username) {
          friends = [...doc.data().friends];
        }
      });
      // console.log(profilephoto);
      var friendsinfo = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().username);
        if (
          doc.data().username != username &&
          friends.includes(doc.data().username)
        ) {
          // console.log("here");
          // console.log(doc.data().username);
          friendsinfo.push(doc.data());
        }
      });
      // console.log(friendsinfo);

      dispatch({
        type: `${userconstant.GET_FRIENDS}_SUCCESS`,
        payload: { friendsinfo },
      });

      // console.log(friends);
      // console.log(friendsinfo);
    });

    return unsubscribe;
  };
};

export const updateMessage = (msgobj) => {
  return async (dispatch) => {
    // console.log(msgobj);
    const db = firebase.firestore().collection("conversations");
    db.get()
      .then((snapshot) => {
        var id = [];
        snapshot.docs.map((doc) => {
          // console.log(doc.id);
          if (
            doc.id.includes(msgobj.sender) &&
            doc.id.includes(msgobj.receiver)
          ) {
            // console.log("Found inside if");
            // console.log(doc.id);
            id.push(doc.id);
            return;
          }
        });

        // console.log(id["0"]);
        if (id["0"] == undefined) {
          // console.log("Not Found");
          db.doc(msgobj.sender + "&" + msgobj.receiver)
            .set({
              messages: [msgobj],
            })
            .then()
            .catch();
        } else {
          // console.log(msgobj);
          db.doc(id["0"]).update({
            messages: firebase.firestore.FieldValue.arrayUnion(msgobj),
          });
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

export const getunseen = (user, friend) => {
  return async (dispatch) => {
    const unsubscribe = await firebase
      .firestore()
      .collection("conversations")
      .doc([user, friend].sort().join("&"))
      .onSnapshot((doc) => {
        // console.log(doc.data());
        console.log(user, friend);
        const messages = [...doc.data().messages];

        const unseen = messages.filter((value) => {
          return value.isViewed == false && value.receiver == user;
        });
        console.log(unseen);
        dispatch({
          type: `${userconstant.GET_UNSEEN}_SUCCESS`,
          payload: { unseen: unseen.length },
        });
      });
    return unsubscribe;
  };
};

export const getrealtimeConversations = (sender, receiver, chatid) => {
  return async (dispatch) => {
    console.log(chatid);

    const db = firebase.firestore();
    const unsubscribe = db
      .collection("conversations")
      .doc(chatid)
      .onSnapshot((doc) => {
        console.log(chatid);

        const messages = [...doc.data().messages];
        // console.log(sender, receiver);
        if (
          messages.length != 0 &&
          messages[messages.length - 1].receiver == sender &&
          messages[messages.length - 1].sender == receiver
        ) {
          messages.forEach((value, index, arr) => {
            arr[index] = { ...value, isViewed: true };
          });
          db.collection("conversations").doc(chatid).update({
            messages,
          });
        }
        dispatch({
          type: `${userconstant.GET_REALTIME_MESSAGES}_SUCCESS`,
          payload: { messages },
        });
      });
    return unsubscribe;
  };
};
