import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchStories,
          fetchNextStories } from "../../actions/story_actions";
import StoryIndex from "./index/story_index";

const mapStateToProps = (state) => {
  return ({
    stories: state.storyData.stories,
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    fetchStories: () => dispatch(fetchStories()),
    fetchNextStories: (lastId) => dispatch(fetchNextStories(lastId)),
    openAuthModal: () => (dispatch(openModal("authIsOpen")))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryIndex);
