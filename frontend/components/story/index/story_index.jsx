import React, { Component } from "react";
import { merge, values, throttle } from "lodash";
import StoryIndexItem from "./story_index_item";
import AuthModal from "../../modal/auth_modal";

class StoryIndex extends Component {
  constructor(props) {
    super(props);

    this.reqNextStories = throttle(this.reqNextStories.bind(this), 1000);
  }

  componentDidMount() {
    if (this.props.tagName) {
      this.props.fetchStories(this.props.tagName);
    } else if (this.props.pathname === "/") {
      window.addEventListener(
        "scroll", this.reqNextStories
      );
      this.props.fetchStories();
    } else {
      this.props.fetchStories();
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "scroll", this.reqNextStories
    );
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.tagName !== nextProps.tagName) {
    //   this.props.fetchStories(nextProps.tagName);
    // }
  }

  reqNextStories() {
    const lastIdx = this.props.stories.length - 1;
    const lastStoryId = this.props.stories[lastIdx].id;

    const scrollTop = $(document).scrollTop();
    const windowHeight = $(window).height();
    const bodyHeight = $(document).height() - windowHeight;
    const scrollPercentage = (scrollTop / bodyHeight);
    if(scrollPercentage > 0.9 && this.props.pathname === "/") {
      this.props.fetchNextStories(lastStoryId);
    }
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
          <AuthModal/>
        </section>
      );
    } else {
      return(<div className="loading"></div>);
    }
  }
}

export default StoryIndex;
