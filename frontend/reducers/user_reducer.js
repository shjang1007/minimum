import React from "react";
import { merge } from "lodash";
import { RECEIVE_USER, RECEIVE_USERS, RECEIVE_LIKES }
        from "../actions/user_actions";

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
    case RECEIVE_USERS:
      return {
        users: action.users,
        user: oldState.user
      };
    default:
      return oldState;
  }
};

export default userReducer;
