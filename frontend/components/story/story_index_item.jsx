import React, { Component } from "react";
import { Link } from "react-router";

// Props has story info
class StoryIndexItem extends Component {
  render() {
    const { id, title, sub_title, content, author, published_at, image_url } =
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
          <Link to={ `/stories/${id}` }>
            <ul className="content-detail">
              <li>{title}</li>
              <li>{sub_title}</li>
              <li>
                <img src={ image_url } className="story-index-image"/>
              </li>
            </ul>
          </Link>
        </div>
        <Link to={ `/stories/${id}` }
            className="story-index-readmore">
          Read more...
        </Link>
      </li>
    );
  }
}

export default StoryIndexItem;
