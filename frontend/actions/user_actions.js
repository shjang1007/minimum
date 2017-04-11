import * as userApiUtil from "../util/user_api_util";
import { receiveCurrentUser } from "./session_actions";

export const RECEIVE_USER = "RECEIVE_USER";

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
