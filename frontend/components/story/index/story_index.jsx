import React, { Component } from "react";
import { merge, values } from "lodash";
import StoryIndexItem from "./story_index_item";
import AuthModal from "../../modal/auth_modal";

class StoryIndex extends Component {
  componentDidMount() {
    if (this.props.tagName) {
      this.props.fetchStories(this.props.tagName);
    } else {
      this.props.fetchStories();
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.tagName !== nextProps.tagName) {
    //   this.props.fetchStories(nextProps.tagName);
    // }
  }

  render() {
    const { stories, currentUser } = this.props;

    if (stories) {
      const storyList = stories.map( (story, index) => (
        <StoryIndexItem key={index}
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

export default StoryIndex;
