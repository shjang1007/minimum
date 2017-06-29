// modules
import React from "react";
import { Link } from "react-router";

// component
import DeleteModal from "../../modal/delete_modal";

const MyPublicStories = ({ stories, handleNavigate,
                            deleteStory, handleModalOpen }) => {
  const storyList = stories.map( (story) => {
    const link = `stories/${story.id}`;

    if (!story.title) {
      return (
        <li key={story.id} className="story-li">
          <button onClick={ handleNavigate("story", story.id) }>
            <div>Untitled story</div>
          </button>
          <button className="gray-button button"
                  onClick={ handleModalOpen }>
            Delete Story
          </button>
          <DeleteModal deleteStory={ deleteStory(story.id) }/>
        </li>
      );
    } else {
      return (
        <li key={ story.id } className="story-li">
          <button onClick={ handleNavigate("story", story.id) }>
            <div>{ story.title }</div>
          </button>
          <button className="gray-button button"
                  onClick={ handleModalOpen }>
            Delete Story
          </button>
          <DeleteModal deleteStory={ deleteStory(story.id) }/>
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
