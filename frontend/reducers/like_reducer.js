import React from "react";
import { merge } from "lodash";

import { RECEIVE_LIKE, REMOVE_LIKE } from "../actions/like_actions";

const likeReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (expression) {
    case RECEIVE_LIKE:
      return merge({}, oldState, action.likeInfo);
    case REMOVE_LIKE:
      let newState = merge({}, oldState);
      delete newState[action.likeInfo.id];
      return newState;
    default:
       return oldState;
  }
};

export default likeReducer;
