import React, { Component } from "react";

// Props has story info
class StoryIndexItem extends Component {
  render() {
    const { title, sub_title, content, author } = this.props.story;
    return(
      <li className="stories-index-item">
        <div className="story-index-profile">
          <ul className="author-info">
            <li>{author.username}</li>
            <li>{author.name}</li>
          </ul>
        </div>
        <div className="story-index-content">
          <ul className="content-detail">
            <li>{title}</li>
            <li>{sub_title}</li>
            <li>{content}</li>
          </ul>
        </div>
      </li>
    );
  }
}

export default StoryIndexItem;
