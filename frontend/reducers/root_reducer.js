import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import storyReducer from "./story_reducer";

export default combineReducers({
  session: sessionReducer,
  stories: storyReducer
});
