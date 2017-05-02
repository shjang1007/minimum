import * as userApiUtil from "../util/user_api_util";
import { receiveCurrentUser } from "./session_actions";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_FOLLOW_USERS = "RECEIVE_FOLLOW_USERS";

export const updateUserInfo = (formData) => (dispatch) => {
  return userApiUtil.updateUserInfo(formData).then(
    (user) => (dispatch(receiveUser(user))
    )
  );
};

export const fetchUser = (username) => (dispatch) => {
  return userApiUtil.fetchUser(username).then(
    (user) => (dispatch(receiveUser(user)))
  );
};

export const receiveUser = (user) => {
  return ({
    type: RECEIVE_USER,
    user
  });
};

export const receiveUsers = (users) => {
  return ({
    type: RECEIVE_USERS,
    users
  });
};

export const receiveFollowUsers = (user) => {
  return ({
    type: RECEIVE_FOLLOW_USERS,
    user
  });
};
