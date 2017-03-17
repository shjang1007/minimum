import * as likeApiUtil from "../util/like_api_util";

export const RECEIVE_STORY = "RECEIVE_STORY";
export const REMOVE_STORY = "REMOVE_STORY";

export const createLike = (like) => (dispatch) => {
  return likeApiUtil.createLike(like).then(
    (story) => (dispatch(receiveStory(story)))
  );
};

export const deleteLike = (like) => (dispatch) => {
  return likeApiUtil.deleteLike(like).then(
    (story) => (dispatch(receiveStory(story)))
  );
};

export const receiveStory = (story) => {
  return ({
    type: RECEIVE_STORY,
    story
  });
};
export const removeStory = (story) => {
  return ({
    type: REMOVE_STORY,
    story
  });
};
