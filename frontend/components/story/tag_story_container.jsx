import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchStories } from "../../actions/story_actions";
import { selectPublishedStories } from "../../reducers/selectors";
import StoryIndex from "./index/story_index";

const mapStateToProps = (state, ownProps) => {
  return ({
    stories: selectPublishedStories(state),
    currentUser: state.session.currentUser,
    tagName: ownProps.tagName
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchStories: (tag_name) => dispatch(fetchStories(tag_name)),
    openAuthModal: () => (dispatch(openModal("authIsOpen")))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryIndex);
