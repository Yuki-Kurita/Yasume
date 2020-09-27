import { combineReducers } from "redux";
import works from "./works/reducer";
import timer from "./timer/reducer";
import user from "./user/reducer";

export default combineReducers({
  works,
  timer,
  user,
});
