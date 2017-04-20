import React from "react";
import { merge } from "lodash";

import { RECEIVE_ITEMS } from "../actions/search_actions";

const searchReducer = (oldState = {}, action) => {
  // Keep state immutable
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_ITEMS:
      return merge({}, action.items);
    default:
      return oldState;
  }
};

export default searchReducer;
