import { userconstant } from "../actions/constants";

const intiState = {
  friends: [],
  users: [],
  conversations: [],
  chatid: null,
  unseen: 0,
};

export default function userReducer(state = intiState, action) {
  // console.log(action.type);
  switch (action.type) {
    case `${userconstant.GET_UNSEEN}_SUCCESS`:
      state = {
        ...state,
        unseen: action.payload.unseen,
      };
      break;
    case `${userconstant.SET_CHAT_ID}_SUCCESS`:
      state = {
        ...state,
        chatid: action.payload.chatid,
      };
      break;
    case `${userconstant.ADD_FRIEND}_REQUEST`:
      break;
    case `${userconstant.ADD_FRIEND}_SUCCESS`:
      state = {
        ...state,
        friends: action.payload.newfriendlist,
      };
      break;
    case `${userconstant.GET_FRIENDS}_REQUEST`:
      break;
    case `${userconstant.GET_FRIENDS}_SUCCESS`:
      state = {
        ...state,
        friends: action.payload.friendsinfo,
      };
      break;
    case `${userconstant.GET_REALTIME_USERS}_REQUEST`:
      break;
    case `${userconstant.GET_REALTIME_USERS}_SUCCESS`:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;
    case `${userconstant.GET_REALTIME_MESSAGES}_SUCCESS`:
      state = {
        ...state,
        conversations: action.payload.messages,
      };
      break;
    case `${userconstant.GET_REALTIME_MESSAGES}_FAILURE`:
      state = {
        ...state,
        conversations: [],
      };
      break;
  }

  return state;
}
