import React, { Component } from "react";
import { connect } from "react-redux";
import { merge, values } from "lodash";
import { Link, withRouter } from "react-router";
import { fetchStory, deleteStory } from "../../actions/story_actions";
import { openModal } from "../../actions/modal_actions";

import MyDrafts from "./my_story_detail/my_drafts";
import MyPublicStories from "./my_story_detail/my_public_stories";

class MyStories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDrafts: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
  }

  handleClick(tab) {
    const { showStories } = this.state;
    return (e) => {
      const draftButton = document.getElementById("my-drafts");
      const storyButton = document.getElementById("my-stories");
      if (tab === "drafts") {
        this.setState({ showDrafts: true });
        draftButton.classList.toggle("black");
        storyButton.classList.toggle("black");
      } else {
        this.setState({ showDrafts: false });
        draftButton.classList.toggle("black");
        storyButton.classList.toggle("black");
      }
    };
  }

  handleNavigate(place, id) {
    const { router, fetchStory } = this.props;

    return (e) => {
      e.preventDefault();

      fetchStory(id).then(
        action => {
          window.scrollTo(0,0);
          if (place === "edit") {
            router.push(`/${id}/edit-story`);
          } else {
            router.push(`stories/${id}`);
          }
        }
      );
    };
  }

  deleteStory(storyId) {
    const { deleteStory, router } = this.props;

    return (e) => {
      e.preventDefault();

      deleteStory(storyId);
    };
  }

  handleModalOpen(e) {
    document.getElementById("navigation-bar").classList.remove("fix");
    document.getElementById("top-nav-bar").classList.add("fifty-height");

    const bottomNavBar = document.getElementById("bottom-nav-bar");
    if (bottomNavBar) bottomNavBar.classList.remove("hidden");

    this.props.openDeleteModal();
  }

  render() {
    const { showDrafts } = this.state;
    const { stories, drafts } = this.props.currentUser;

    const displayIndex = showDrafts ?
      <MyDrafts drafts={ drafts }
                handleNavigate={ this.handleNavigate }
                deleteStory={ this.deleteStory }
                handleModalOpen={ this.handleModalOpen }/> :
      <MyPublicStories stories={ stories }
                      handleNavigate={ this.handleNavigate }
                      deleteStory={ this.deleteStory }
                      handleModalOpen={ this.handleModalOpen }/>;

    return (
      <section className="my-story-container">
        <div className="top-banner">
          Your stories
        </div>
        <ul className="toggle-tab">
          <li className="tab-first-button">
            <button id="my-drafts" className="my-story-btn black"
                    onClick={ this.handleClick("drafts") }>
              Drafts ({ drafts.length })
            </button>
          </li>
          <li>
            <button id="my-stories" className="my-story-btn"
                    onClick={ this.handleClick() }>
              Public ({ stories.length })
            </button>
          </li>
        </ul>
        { displayIndex }
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchStory: (id) => (dispatch(fetchStory(id))),
    deleteStory: (id) => (dispatch(deleteStory(id))),
    openDeleteModal: () => (dispatch(openModal("deleteIsOpen")))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MyStories));
