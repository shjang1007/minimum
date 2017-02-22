import * as storyApiUtil from "../util/story_api_util";

export const RECEIVE_STORIES = "RECEIVE_STORIES";
export const RECEIVE_STORY = "RECEIVE_STORY";
export const REMOVE_STORY = "REMOVE_STORY";

export const fetchStories = () => (dispatch) => {
  return storyApiUtil.fetchStories().then(
    (stories) => {
      return dispatch(receiveStories(stories));
    }
  );
};

export const fetchStory = (id) => (dispatch) => {
  return storyApiUtil.fetchStory(id).then(
    (story) => {
      return dispatch(receiveStory(story));
    }
  );
};

export const createStory = (story) => (dispatch) => {
  return storyApiUtil.createStory(story).then(
    (story) => {
      return dispatch(receiveStory(story));
    }
  );
};

export const updateStory = (story) => (dispatch) => {
  return storyApiUtil.updateStory(story).then(
    (story) => (dispatch(receiveStory(story)))
  );
};

export const updateStoryImage = (formData) => (dispatch) => {
  return storyApiUtil.updateStoryImage(formData).then(
    (story) => (dispatch(receiveStory(story)))
  );
};

export const deleteStory = (id) => (dispatch) => {
  return storyApiUtil.deleteStory(id).then(
    (story) => (dispatch(removeStory(story)))
  );
};

export const receiveStories = (stories) => {
  return ({
    type: RECEIVE_STORIES,
    stories
  });
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
