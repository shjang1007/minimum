import React from "react";
import { merge } from "lodash";

import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS }
  from "../actions/session_actions";

const _initialState = {
  currentUser: null,
  errors: []
};

const sessionReducer = (oldState = _initialState, action) => {
  // Keep state immutable
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        currentUser: action.currentUser,
        errors: []
      };
    case RECEIVE_ERRORS:
      return {
        currentUser: null,
        errors: action.errors
      };
    default:
      return oldState;
  }
};

export default sessionReducer;
