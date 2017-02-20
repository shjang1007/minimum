import React, { Component } from "react";
import { connect } from "react-redux";
import { merge, values } from "lodash";
import { fetchStories } from "../../actions/story_actions";
import { selectAllStories, selectPublishedStories } from "../../reducers/selectors";
import StoryIndexItem from "./story_index_item";

class StoryIndex extends Component {
  componentDidMount() {
    this.props.fetchStories();
  }

  render() {
    const { stories } = this.props;
    const storyList = stories.map( (story) => (
      <StoryIndexItem key={story.id} story={ story } />
    ));

    return (
      <ul className="story-index">
        {storyList}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  const stories = values(state.stories);

  return { stories: selectAllStories(state) };
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchStories: () => dispatch(fetchStories())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryIndex);
