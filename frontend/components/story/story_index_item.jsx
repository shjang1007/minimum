import React, { Component } from "react";

// Props has story info
class StoryIndexItem extends Component {
  render() {
    const { title, sub_title, content, author, published_at } =
      this.props.story;

    return(
      <li className="story-index-item">
        <div className="story-index-profile">
          <ul className="author-info">
            <li>
              <img src={ author.avatar_url } className="story-avatar" />
            </li>
            <li>
              <div>{author.name}</div>
              <div>{published_at}</div>
            </li>
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
