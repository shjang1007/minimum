import React from "react";
import { merge } from "lodash";

import { RECEIVE_STORIES, RECEIVE_STORY, REMOVE_STORY, RECEIVE_COMMENT }
  from "../actions/story_actions";

const storyReducer = (oldState = {}, action) => {
  // Keep state immutable
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_STORIES:
      return merge({}, action.stories);
    case RECEIVE_STORY:
      let updateLikeState = merge({}, oldState, {[action.story.id]: action.story});
      updateLikeState[action.story.id].liked_users = action.story.liked_users;
      updateLikeState[action.story.id].parent_story = action.story.parent_story;
      return updateLikeState;
    case REMOVE_STORY:
      let newState = merge({}, oldState);
      delete newState[action.story.id];
      return newState;
    case RECEIVE_COMMENT:
      let newStateComment = merge({}, oldState);
      newStateComment[action.comment.parent_id].comments[action.comment.id] = action.comment;
      return newStateComment;
    default:
      return oldState;
  }
};

export default storyReducer;
