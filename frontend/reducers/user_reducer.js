import React from "react";
import { merge } from "lodash";
import { RECEIVE_USER } from "../actions/user_actions";

const userReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_USER:
      let newState = merge({}, action.user);
      return newState;
    default:
      return oldState;
  }
};

export default userReducer;
