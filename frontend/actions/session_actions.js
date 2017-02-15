import * as sessionApiUtil from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const signup = (user) => (dispatch) => {
  return sessionApiUtil.signup(user).then(
    (user) => (dispatch(receiveCurrentUser(user))),
    (errors) => (dispatch(receiveErrors(errors.responseJSON)))
  );
};

export const signin = (user) => (dispatch) => {
  return sessionApiUtil.signin(user).then(
    (user) => (dispatch(receiveCurrentUser(user))),
    (errors) => (dispatch(receiveErrors(errors.responseJSON)))
  );
};

export const signout = () => (dispatch) => {
  return sessionApiUtil.signout().then(
    () => (dispatch(receiveCurrentUser(null)))
  );
};


export const receiveCurrentUser = (currentUser) => {
  return ({
    type: RECEIVE_CURRENT_USER,
    currentUser
  });
};

export const receiveErrors = (errors) => {
  return ({
    type: RECEIVE_ERRORS,
    errors
  });
};
