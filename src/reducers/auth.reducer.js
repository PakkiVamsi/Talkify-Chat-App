import { authConstant } from "../actions/constants";

const initState = {
  firstname: "",
  lastname: "",
  email: "",
  authenticating: null,
  authenticated: null,
  error: "",
  isunique: null,
  profilephoto: null,
};
export default function authReducer(state = initState, action) {
  // console.log(action);

  switch (action.type) {
    case `${authConstant.SET_PROFILE_PHOTO}_SUCCESS`:
      return { ...state, profilephoto: action.payload.photoURL };
      break;

    case `${authConstant.USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case `${authConstant.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };
      break;
    case `${authConstant.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      };
      break;
    case `${authConstant.USER_LOGOUT}_REQUEST`:
      break;
    case `${authConstant.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initState,
      };
      break;
    case `${authConstant.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };

      break;
    case `${authConstant.USER_CHECK_ID}_SUCCESS`:
      // console.log(state);
      state = {
        ...state,
        isunique: action.payload.isunique,
      };
      // console.log(state);
      break;
  }

  return state;
}
