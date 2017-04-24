import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import storyReducer from "./story_reducer";
import modalReducer from "./modal_reducer";
import userReducer from "./user_reducer";
import searchReducer from "./search_reducer";

export default combineReducers({
  session: sessionReducer,
  storyData: storyReducer,
  modal: modalReducer,
  userData: userReducer,
  items: searchReducer
});
