import React, { Component } from "react";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router";
import { fetchStories } from "../../actions/story_actions";
import { selectTopTagStories, selectTopStories, selectBrianStories }
  from "../../reducers/selectors";

class StorySideIndex extends Component {
  render() {
    const { stories, currentUser } = this.props;
    if (stories) {
      const storyList = stories.map( (story) => (
        <ul key={ story.id } className="item-preview">
          <li>
            <Link to={`/@${story.author.username}`}>
              <img src={ story.author.avatar_url }
                className="story-avatar avatar"/>
            </Link>
          </li>
          <li className="item-preview-text">
            <Link to={`/stories/${story.id}`}>
              { story.title }
            </Link>
            <Link to={`/@${story.author.username}`}>
              { story.author.name }
            </Link>
          </li>
        </ul>
      ));

      return (
        <section>
          { storyList }
        </section>
      );
    } else {
      return(<div className="loading"></div>);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let allStories = state.storyData.stories ? state.storyData.stories : [];
  let stories;
  if (ownProps.type === "top-stories") {
    stories = selectTopStories(allStories);
  } else if (ownProps.type === "brian-stories") {
    stories = selectBrianStories(allStories);
  } else {
    stories = selectTopTagStories(allStories, ownProps.tagName);
  }

  return { stories };
};

export default connect(
  mapStateToProps
)(StorySideIndex);
