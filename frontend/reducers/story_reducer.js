import React from "react";
import { merge } from "lodash";

import { RECEIVE_STORIES,
          RECEIVE_STORY,
          REMOVE_STORY,
          RECEIVE_COMMENT,
          CLEAR_STORY
        }
  from "../actions/story_actions";

const storyReducer = (oldState = {}, action) => {
  // Keep state immutable
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_STORIES:
      return merge({}, action.stories);
    case RECEIVE_STORY:
      let updateState = merge({}, oldState, {[action.story.id]: action.story});
      updateState[action.story.id].liked_users = action.story.liked_users;
      return updateState;
    case REMOVE_STORY:
      let newState = merge({}, oldState);
      delete newState[action.story.id];
      return newState;
    case CLEAR_STORY:
      return {};
    default:
      return oldState;
  }
};

export default storyReducer;
