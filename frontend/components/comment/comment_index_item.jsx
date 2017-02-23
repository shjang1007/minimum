import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { values } from "lodash";
import { createLike, deleteLike } from "../../actions/like_actions";

// Props has story info
class CommentIndexItem extends Component {
  toggleLike(method) {
    const { comment, currentUser } = this.props;
    const likeInfo = { user_id: currentUser.id, story_id: comment.id };
    return (e) => {
      if (method === "delete") {
        this.props.deleteLike(likeInfo);
      } else {
        this.props.createLike(likeInfo);
      }
    };
  }
  renderLikeButton() {
    const { comment, currentUser } = this.props;

    if (currentUser === null) {
      return (
        <button onClick={ this.props.openAuthModal }>
          <img src={ window.images.likeEmpty } />
        </button>
      );
    } else if (comment.liked_users &&
        Object.keys(comment.liked_users).includes(currentUser.id.toString())) {
      return (
        <button onClick={ this.toggleLike("delete") }>
          <img src={ window.images.likeFilled } />
        </button>
      );
    } else {
      return (
        <button onClick={ this.toggleLike("create") }>
          <img src={ window.images.likeEmpty } />
        </button>
      );
    }
  }

  render() {
    const { id, title, sub_title, content, parent_story, author, published_at,
            image_url, liked_users } = this.props.comment;

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

        <div className="post-story-actions">
          { this.renderLikeButton() }
          <div className="num-likes">{ values(liked_users).length }</div>
        </div>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    createLike: (like) => (dispatch(createLike(like))),
    deleteLike: (like) => (dispatch(deleteLike(like)))
  });
};

export default connect(
  null,
  mapDispatchToProps
)(CommentIndexItem);
