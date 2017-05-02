import * as followApiUtil from "../util/follow_api_util";

import { receiveUser, receiveFollowUsers } from "./user_actions";

export const createFollow = (follow) => (dispatch) => {
  return followApiUtil.createFollow(follow).then(
    (followee) => {
      dispatch(receiveUser(followee));
    }
  );
};

export const deleteFollow = (follow) => (dispatch) => {
  return followApiUtil.deleteFollow(follow).then(
    (followee) => {
      dispatch(receiveUser(followee));
    }
  );
};

export const createIndexFollow = (follow) => (dispatch) => {
  return followApiUtil.createFollow(follow).then(
    (followee) => {
      dispatch(receiveFollowUsers(followee));
    }
  );
};

export const deleteIndexFollow = (follow) => (dispatch) => {
  return followApiUtil.deleteFollow(follow).then(
    (followee) => {
      dispatch(receiveFollowUsers(followee));
    }
  );
};
