import firebase from "firebase";
import { authConstant } from "./constants";
import { deleteUserMessages } from "./user.actions";
import { NavLink, Link, Redirect } from "react-router-dom";

export const signup = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(user.username)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          dispatch({
            type: `${authConstant.USER_LOGIN}_FAILURE`,
            payload: { error: "USERNAME ALREADY EXISTS" },
          });
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((data) => {
              // console.log(data);
              const currentUser = firebase.auth().currentUser;
              const name = `${user.firstname} ${user.lastname}`;
              currentUser
                .updateProfile({
                  displayName: name,
                })
                .then(() => {
                  // console.log("Updated ");
                  // console.log(data);
                  db.collection("users")
                    .doc(user.username)
                    .set({
                      firstname: user.firstname,
                      lastname: user.lastname,
                      username: user.username,
                      uid: data.user.uid,
                      email: user.email,
                      profilephoto: "",
                      createdAt: new Date(),
                      isOnline: true,
                      typing: false,
                      friends: [],
                      lastseen: null,
                    })
                    .then(() => {
                      const loggedInUser = {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        uid: data.user.uid,
                        email: user.email,
                        profilephoto: "",
                        chatStarted: false,
                        createdAt: new Date(),
                      };

                      localStorage.setItem(
                        "user",
                        JSON.stringify(loggedInUser)
                      );
                      // console.log("User logged in Successfully");
                      dispatch({
                        type: `${authConstant.USER_LOGIN}_SUCCESS`,
                        payload: { user: loggedInUser },
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                      const errormsg = error.code;
                      dispatch({
                        type: `${authConstant.USER_LOGIN}_FAILURE`,
                        payload: { error: errormsg },
                      });
                    });
                })
                .catch();
            })
            .catch((error) => {
              console.log(error);
              var errormsg = "";
              if (error.code == "auth/email-already-in-use") {
                errormsg = "Email is already in use";
              }
              if (error.code == "auth/weak-password") {
                errormsg = "Password should be atleast 6 characters";
              }
              dispatch({
                type: `${authConstant.USER_LOGIN}_FAILURE`,
                payload: { error: errormsg },
              });
            });
        }
      });
  };
};
export const login = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore();

    dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` });
    const unsubscribeout = firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        // console.log(data);
        var username = "";
        db.collection("users")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              // console.log(data.user.uid);
              if (data.user.uid == doc.data().uid) {
                // console.log("hurray");
                username = doc.data().username;
                // console.log(username);

                db.collection("users")
                  .doc(username)
                  .update({
                    isOnline: true,
                  })
                  .then(() => {
                    const name = data.user.displayName.split(" ");
                    const firstName = name[0];
                    const lastName = name[1];

                    const loggedInUser = {
                      firstname: firstName,
                      lastname: lastName,
                      username: username,
                      profilephoto: doc.data().profilephoto,
                      uid: data.user.uid,
                      chatStarted: false,
                      email: data.user.email,
                      lastseen: null,
                    };

                    localStorage.setItem("user", JSON.stringify(loggedInUser));
                    // console.log("User logged in Successfully");
                    dispatch({
                      type: `${authConstant.USER_LOGIN}_SUCCESS`,
                      payload: { user: loggedInUser },
                    });
                  })
                  .catch((error) => {
                    const errormsg = error.code;
                    dispatch({
                      type: `${authConstant.USER_LOGIN}_FAILURE`,
                      payload: { error: errormsg },
                    });
                  });
              }
            });
          });
      })
      .catch((error) => {
        console.log(error);
        var errormsg = "";
        if (error.code == "auth/wrong-password") {
          errormsg = "Incorrect Password";
        }
        if (error.code == "auth/user-not-found") {
          errormsg = "User Not Found";
        }
        if (error.code == "auth/too-many-requests") {
          errormsg =
            "You have reached maximum login attempts ,Please try again later or Reset Password";
        }
        dispatch({
          type: `${authConstant.USER_LOGIN}_FAILURE`,
          payload: { error: errormsg },
        });
      });
  };
};

export const sendPasswordResetEmail = (email) => {
  return async (dispatch) => {
    console.log(email);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("email sent");
      })
      .catch((error) => {
        console.log(error);
        var errormsg = "";
        if (error.code == "auth/user-not-found") {
          errormsg = "Invalid Email";
        }
        dispatch({
          type: `${authConstant.USER_LOGIN}_FAILURE`,
          payload: { error: errormsg },
        });
      });
  };
};

// export const ssignup = (option) => {
//   const db = firebase.firestore();
//   return async (dispatch) => {
//     // console.log(option);
//     if (option == "google") {
//       var provider = new firebase.auth.GoogleAuthProvider();
//     }
//     if (option == "facebook") {
//       var provider = new firebase.auth.FacebookAuthProvider();
//     }
//     firebase
//       .auth()
//       .signInWithPopup(provider)
//       .then((result) => {
//         var token = result.credential.accessToken;
//         var user = result.user;
//
//         // console.log(user);
//         firebase.auth().onAuthStateChanged((user) => {
//           // console.log(user);
//           if (user) {
//             const name = user.displayName.split(" ");
//             const firstname = name[0];
//             const lastname = name[1];
//             db.collection("users")
//               .add({
//                 firstname,
//                 lastname,
//                 uid: user.uid,
//                 createdAt: new Date(),
//               })
//               .then(() => {
//                 // console.log("added");
//                 const loggedInUser = {
//                   firstname,
//                   lastname,
//                   uid: user.uid,
//                   createdAt: new Date(),
//                 };
//
//                 localStorage.setItem("user", JSON.stringify(loggedInUser));
//                 // console.log("User logged in Successfully");
//                 dispatch({
//                   type: `${authConstant.USER_LOGIN}_SUCCESS`,
//                   payload: { user: loggedInUser },
//                 });
//               })
//               .catch((error) => {
//                 const errormsg = error.code;
//                 dispatch({
//                   type: `${authConstant.USER_LOGIN}_FAILURE`,
//                   payload: { error: errormsg },
//                 });
//               });
//           } else {
//           }
//         });
//       })
//       .catch((error) => {
//         // console.log(error);
//       });
//   };
// };

export const isLoggedInUser = () => {
  // console.log("is");
  return async (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    // console.log(user);
    if (user) {
      dispatch({
        type: `${authConstant.USER_LOGIN}_SUCCESS`,
        payload: { user },
      });
    } else {
      dispatch({
        type: `${authConstant.USER_LOGIN}_FAILURE`,
        payload: { error: "" },
      });
    }
  };
};

export const logout = (username) => {
  console.log("logout _REQUEST");
  return async (dispatch) => {
    const d = new Date();
    // console.log(d);
    dispatch({
      type: `${authConstant.USER_LOGOUT}_REQUEST`,
    });

    // console.log(username);

    // console.log(username);

    const db = firebase.firestore();
    db.collection("users")
      .doc(username)
      .update({ isOnline: false, lastseen: d })
      .then(() => {
        dispatch(deleteUserMessages(username));
        firebase
          .auth()
          .signOut()
          .then(() => {
            //successfully
            localStorage.clear();
            dispatch({ type: `${authConstant.USER_LOGOUT}_SUCCESS` });
          })
          .catch((error) => {
            // console.log(error);
            const errormsg = error.code;
            dispatch({
              type: `${authConstant.USER_LOGOUT}_FAILURE`,
              payload: { error: errormsg },
            });
          });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};
