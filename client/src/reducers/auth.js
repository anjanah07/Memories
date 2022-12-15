import { AUTH, LOGOUT } from "../constants/actionTypes";
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      try {
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        console.log("done");
        return { ...state, authData: action?.data };
      } catch (error) {
        return console.error(error);
      }
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};
export default authReducer;
