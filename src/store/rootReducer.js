import { combineReducers } from "redux";
import works from "./works/reducer";
import timer from "./timer/reducer";
import user from "./user/reducer";
import form from "./form/reducer";

export default combineReducers({
  works,
  timer,
  user,
  form,
});
