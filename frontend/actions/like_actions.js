import * as likeApiUtil from "../util/like_api_util";

import { receiveStory, receiveLikeStories } from "./story_actions";
import { fetchUser } from "./user_actions";


export const createLike = (like) => (dispatch) => {
  return likeApiUtil.createLike(like).then(
    (story) => {
      dispatch(receiveStory(story));
    }
  );
};

export const deleteLike = (like) => (dispatch) => {
  return likeApiUtil.deleteLike(like).then(
    (story) => {
      dispatch(receiveStory(story));
    }
  );
};

export const createIndexLike = (like) => (dispatch) => {
  return likeApiUtil.createLike(like).then(
    (story) => {
      dispatch(receiveLikeStories(story));
    }
  );
};

export const deleteIndexLike = (like) => (dispatch) => {
  return likeApiUtil.deleteLike(like).then(
    (story) => {
      dispatch(receiveLikeStories(story));
    }
  );
};

export const createUserLike = (like) => (dispatch) => {
  return likeApiUtil.createLike(like).then(
    (story) => {
      dispatch(fetchUser(story.author.username));
    }
  );
};

export const deleteUserLike = (like) => (dispatch) => {
  return likeApiUtil.deleteLike(like).then(
    (story) => {
      dispatch(fetchUser(story.author.username));
    }
  );
};
