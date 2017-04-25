import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchBrianStories } from "../../actions/story_actions";
import { values, isEqual } from 'lodash';
import StoryIndex from "./index/story_index";

const mapStateToProps = (state, ownProps) => {
  return ({
    stories: state.storyData.stories,
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchStories: () => dispatch(fetchBrianStories()),
    openAuthModal: () => (dispatch(openModal("authIsOpen")))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryIndex);
