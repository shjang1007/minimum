import React from "react";
import { merge } from "lodash";

import { RECEIVE_STORIES,
          RECEIVE_LIKE_STORIES,
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
      return {
        stories: action.stories,
        story: oldState.story
      };
    case RECEIVE_LIKE_STORIES:
      let newUpdatedState = merge({}, oldState);
      newUpdatedState.stories.forEach((story, i) =>
       { if (story.id === action.story.id) {
         newUpdatedState.stories[i] = action.story;
          }
        }
      );

      return newUpdatedState;
    case RECEIVE_STORY:
      return {
        stories: oldState.stories,
        story: action.story
      };
    case REMOVE_STORY:
      return {
        stories: null,
        story: null
      };
    case RECEIVE_COMMENT:
      let newState = merge({}, oldState);
      newState.story.comments.unshift(action.comment);
      return newState;
    default:
      return oldState;
  }
};

export default storyReducer;
