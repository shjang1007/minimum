import React from "react";
import { merge } from "lodash";

import { RECEIVE_STORIES, RECEIVE_STORY, REMOVE_STORY }
  from "../actions/story_actions";

const storyReducer = (oldState = {}, action) => {
  // Keep state immutable
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_STORIES:
      return merge({}, action.stories);
    case RECEIVE_STORY:
      return merge({}, oldState, {[action.story.id]: action.story});
    case REMOVE_STORY:
      let newState = merge({}, oldState);
      delete newState[action.story.id];
      return newState;
    default:
      return oldState;
  }
};

export default storyReducer;
