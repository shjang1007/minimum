import React, { Component } from "react";
import { connect } from "react-redux";
import { merge, values } from "lodash";
import { fetchStories } from "../../actions/story_actions";
import { openModal } from "../../actions/modal_actions";
import { selectPublishedStories } from "../../reducers/selectors";
import StoryIndexItem from "./story_index_item";
import AuthModal from "../modal/auth_modal";

class StoryIndex extends Component {
  componentDidMount() {
    this.props.fetchStories();
  }

  render() {
    const { stories, currentUser } = this.props;

    if (stories) {
      const storyList = stories.map( (story) => (
        <StoryIndexItem key={story.id}
            story={ story }
            currentUser={ currentUser }
            openAuthModal={ this.props.openAuthModal }/>
      ));

      return (
        <section>
          <ul className="story-index">
            {storyList}
          </ul>
          <AuthModal />
        </section>
      );
    } else {
      return(<div className="loading"></div>);
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    stories: selectPublishedStories(state),
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchStories: () => dispatch(fetchStories()),
    openAuthModal: () => (dispatch(openModal("authIsOpen")))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryIndex);
