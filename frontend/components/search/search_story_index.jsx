import React, { Component } from "react";
import { connect } from "react-redux";
import { values } from "lodash";
import { openModal } from "../../actions/modal_actions";
import StoryIndexItem from "../story/index/story_index_item";
import AuthModal from "../modal/auth_modal";

const SearchStoryIndex = ({ stories, currentUser, openAuthModal }) => {
  if (stories) {
    const storyList = values(stories).map( (story) => (
      <StoryIndexItem key={story.id}
          story={ story }
          currentUser={ currentUser }
          openAuthModal={ openAuthModal }/>
    ));
    return (
      <section>
        <ul className="story-index">
          {storyList}
        </ul>
        <AuthModal/>
      </section>
    );
  } else {
    return(<div className="loading"></div>);
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openAuthModal: () => (dispatch(openModal("authIsOpen")))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchStoryIndex);
