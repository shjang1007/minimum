import React from "react";
import { Link } from "react-router";

const MyPublicStories = ({ stories, handleNavigate }) => {
  const storyList = stories.map( (story) => {
    const link = `stories/${story.id}`;

    if (!story.title) {
      return (
        <li key={story.id} className="story-li">
          <button onClick={ handleNavigate("story", story.id) }>
            <div>Untitled story</div>
          </button>
        </li>
      );
    } else {
      return (
        <li key={ story.id } className="story-li">
          <button onClick={ handleNavigate("story", story.id) }>
            <div>{ story.title }</div>
          </button>
        </li>
      );
    }
  });

  return (
    <ul className="story-index">
      {storyList}
    </ul>
  );
};

export default MyPublicStories;
