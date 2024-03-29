import { values, isEmpty } from 'lodash';

export const selectAllStories = ({ stories }) => values(stories);

export const selectPublishedStories = ({ stories }) => {
  const storiesArray = values(stories);
  return storiesArray.filter( (story) => (
    story.published && !story.parent_id
  )).sort((x, y) => (y.id - x.id));
};

export const orderStories = ({ stories }) => {
  return values(stories).sort((x, y) => (y.id - x.id));
};

export const selectTopTagStories = (stories, tagName) => {
  const tagStories = [];

  let i = 0;
  while (stories.length > 0 && i < stories.length) {
    let story = stories[i];
    let tagNames = story.tags.map((tag) => tag.name);
    if (story.published && !story.parent_id && tagNames.includes(tagName)) {
      tagStories.push(story);

      if (tagStories.length === 3) {
        return tagStories;
      }
    }

    i++;
  }

  return tagStories;
};

export const selectTopStories = (stories) => {
  const topStories = stories.sort((x, y) => (y.likes - x.likes));

  return topStories.filter( (story) =>
    story.published && !story.parent_id
  ).slice(0, 3);
};

export const selectBrianStories = (stories) => {
  const brianStories = stories.sort((x, y) => (y.id - x.id));

  return brianStories.filter( (story) =>
    story.published && !story.parent_id && story.author.username === "BekGu"
  ).slice(0, 3);
};

export const selectPublishedComments = (stories, parentId) => {
  const commentsArray = values(stories);
  return commentsArray.filter( (story) => (
    story.published && story.parent_id === parseInt(parentId)
  )).sort((x, y) => (y.id - x.id));
};

export const selectPublishedUserStories = (stories, authorId) => {
  const commentsArray = values(stories);
  return commentsArray.filter( (story) => (
    story.published && story.author.id === authorId && !story.parent_id
  )).sort((x, y) => (y.id - x.id));
};

export const selectDraftStories = ({ stories }) => {
  const storiesArray = values(stories);
  return storiesArray.filter( (story) => !story.published)
  .sort((x, y) => (y.id - x.id));
};


export const selectMyPublishedStories = (stories, author_id) => {
  const storiesArray = values(stories);
  return storiesArray.filter( (story) => (
    story.published && story.author.id === author_id
  )).sort((x, y) => (y.id - x.id));
};

export const selectMyDraftStories = (stories, author_id) => {
  const storiesArray = values(stories);
  return storiesArray.filter( (story) => (
    !story.published && story.author.id === author_id
  )).sort((x, y) => (y.id - x.id));
};
