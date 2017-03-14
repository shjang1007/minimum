import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchBrianStories } from "../../actions/story_actions";
import { values } from 'lodash';
import StoryIndex from "./index/story_index";

const mapStateToProps = (state, ownProps) => {
  return ({
    stories: values(state.stories).sort((x, y) => (x.id - y.id)),
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
