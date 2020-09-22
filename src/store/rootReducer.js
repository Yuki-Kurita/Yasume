import { combineReducers } from "redux";
import works from "./works/reducer";
import timer from "./timer/reducer";

export default combineReducers({
  works,
  timer,
});
