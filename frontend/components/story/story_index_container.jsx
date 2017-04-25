import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchStories } from "../../actions/story_actions";
import { orderStories } from "../../reducers/selectors";
import StoryIndex from "./index/story_index";

const mapStateToProps = (state) => {
  return ({
    stories: state.storyData.stories,
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
