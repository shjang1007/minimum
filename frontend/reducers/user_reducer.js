import React from "react";
import { merge } from "lodash";
import { RECEIVE_USER, RECEIVE_USERS, RECEIVE_FOLLOW_USERS }
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
    case RECEIVE_FOLLOW_USERS:
      let newUpdatedState = merge({}, oldState);
      newUpdatedState.users.forEach((user, i) =>
       { if (user.id === action.user.id) {
         newUpdatedState.users[i] = action.user;
          }
        }
      );

      return newUpdatedState;
    default:
      return oldState;
  }
};

export default userReducer;
