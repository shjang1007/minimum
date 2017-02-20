import { values } from 'lodash';

export const selectAllStories = ({ stories }) => values(stories);

export const selectPublishedStories = ({ stories }) => {
  const storiesArray = values(stories);
  return storiesArray.filter( (story) => story.published);
};

export const selectDraftStories = ({ stories }) => {
  const storiesArray = values(stories);
  return storiesArray.filter( (story) => !story.published);
};

// return foundStory || {};
