import { values } from 'lodash';

export const selectAllStories = ({ stories }) => values(stories);

export const selectPublishedStories = ({ stories }) => {
  const storiesArray = values(stories);
  return storiesArray.filter( (story) => (
    story.published && !story.parent_id
  ));
};

export const selectPublishedComments = ({ comments }) => {
  const commentsArray = values(comments);
  return commentsArray.filter( (comment) => comment.published);
};

export const selectDraftStories = ({ stories }) => {
  const storiesArray = values(stories);
  return storiesArray.filter( (story) => !story.published);
};


export const selectMyPublishedStories = (stories, author_id) => {
  const storiesArray = values(stories);
  return storiesArray.filter( (story) => (
    story.published && story.author.id === author_id
  ));
};

export const selectMyDraftStories = (stories, author_id) => {
  const storiesArray = values(stories);
  return storiesArray.filter( (story) => (
    !story.published && story.author.id === author_id
  ));
};
