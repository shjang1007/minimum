import React from "react";
import { merge } from "lodash";
import { RECEIVE_USER } from "../actions/user_actions";

const _initialState = {
  users: null,
  user: null
};

const userReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_USER:
      return {
        users: null,
        user: action.user
      };
    default:
      return oldState;
  }
};

export default userReducer;
