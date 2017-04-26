import React, { Component } from "react";
import { connect } from "react-redux";
import { merge, values } from "lodash";
import { Link, withRouter } from "react-router";
import { fetchStory } from "../../actions/story_actions";

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

  render() {
    const { showDrafts } = this.state;
    const { stories, drafts } = this.props.currentUser;

    const displayIndex = showDrafts ?
      <MyDrafts drafts={ drafts }
                handleNavigate={ this.handleNavigate }/> :
      <MyPublicStories stories={ stories }
                      handleNavigate={ this.handleNavigate }/>;

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
    fetchStory: (id) => (dispatch(fetchStory(id)))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MyStories));
