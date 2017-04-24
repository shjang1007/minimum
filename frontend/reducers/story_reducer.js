import React from "react";
import { merge } from "lodash";

import { RECEIVE_STORIES,
          RECEIVE_STORY,
          REMOVE_STORY,
          RECEIVE_COMMENT,
          CLEAR_STORY
        }
  from "../actions/story_actions";

  const _initialState = {
    stories: null,
    story: null
  };

const storyReducer = (oldState = _initialState, action) => {
  // Keep state immutable
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_STORIES:

      return merge({}, oldState, { stories: action.stories });
    case RECEIVE_STORY:
      // let updateState = merge({}, oldState, {[action.story.id]: action.story});
      // updateState[action.story.id].liked_users = action.story.liked_users;
      // return updateState;
      return {
        stories: oldState.stories,
        story: action.story
      };
    case REMOVE_STORY:
      // let newState = merge({}, oldState);
      // delete newState[action.story.id];
      // return newState;
      return {
        stories: null,
        story: null
      };
    case CLEAR_STORY:
      return {};
    default:
      return oldState;
  }
};

export default storyReducer;
