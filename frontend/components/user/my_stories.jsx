import React, { Component } from "react";
import { connect } from "react-redux";
import { merge, values } from "lodash";
import { Link } from "react-router";
import { fetchStories } from "../../actions/story_actions";
import { selectMyPublishedStories, selectMyDraftStories } from "../../reducers/selectors";

class MyStories extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchStories();
  }

  render() {
    const { stories, currentUser } = this.props;
    const location = this.props.location.pathname;
    if (stories) {
      const storyList = stories.map( (story) => {
        let link = `stories/${story.id}`;
        if (location.includes("/draft")) {
          link = `/${story.id}/edit-story`;
        }
        if (!story.title) {
          return (
            <li key={story.id} className="story-li">
              <Link to={ link } >
                <div>Untitled story</div>
              </Link>
            </li>
          );
        } else {
          return (
            <li key={story.id} className="story-li">
              <Link to={ link }>
                <div>{ story.title }</div>
              </Link>
            </li>
          );
        }
      });

      return (
        <section className="my-story-container">
          <div className="top-banner">
            Your stories
          </div>
          <ul className="toggle-tab">
            <li className="tab-first-button">
              <Link to="/me/stories/drafts">
                Drafts { this.props.draftNum }
              </Link>
            </li>
            <li>
              <Link to="/me/stories/public">
                Public { this.props.publicNum }
              </Link>
            </li>
          </ul>
          <ul className="story-index">
            {storyList}
          </ul>
        </section>
      );
    } else {
      return(<div className="loading"></div>);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const publicStories = selectMyPublishedStories(state.stories, state.session.currentUser.id);
  const draftStories = selectMyDraftStories(state.stories, state.session.currentUser.id);

  let publicNum;
  let draftNum;
  if (publicStories && draftStories) {
    publicNum = publicStories.length;
    draftNum =  draftStories.length;
  }
  if (ownProps.location.pathname.includes("/public")) {
    return ({
      currentUser: state.session.currentUser,
      stories: publicStories,
      publicNum,
      draftNum
    });
  } else {
    return ({
      currentUser: state.session.currentUser,
      stories: draftStories,
      publicNum,
      draftNum
    });
  }
};

const mapDispatchToProps = (dispatch) => {
  return ({ fetchStories: () => dispatch(fetchStories()) });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyStories);
