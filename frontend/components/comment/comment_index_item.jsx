import React, { Component } from "react";
import { Link } from "react-router";

// Props has story info
const CommentIndexItem = ({ comment }) => {
  const { id, title, sub_title, content, parent_story, author, published_at,
          image_url } = comment

  return(
    <li className="index-item">
      <div className="index-item-profile">
        <ul className="index-item-author-info">
          <li>
            <img src={ author.avatar_url } className="story-avatar avatar" />
          </li>
          <li className="author-date-container">
            <Link to={ `/@${author.username}` }
                className="green-button">
              {author.name}
            </Link>
            <Link to={ `/stories/${id}` }
                className="gray-button">
              {published_at}
            </Link>
          </li>
        </ul>
      </div>
      <div className="index-item-content">
        <Link to={ `/stories/${id}` }
            className="gray-button">
          <ul className="content-detail">
            <li>
              <img src={ image_url } className="index-item-image"/>
            </li>
            <li>
              <h3 className="index-item-title comment-contents">
                { title }
              </h3>
            </li>
            <li>
              <h4 className="index-item-subtitle comment-contents">
                { sub_title }
              </h4>
            </li>
            <li>
              <p className="index-item-content comment-contents">
                { content }
              </p>
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

export default CommentIndexItem;
