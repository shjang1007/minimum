import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { values } from "lodash";
import { createUserLike, deleteUserLike } from "../../actions/like_actions";

// Props has story info
class UserStoryIndexItem extends Component {
  toggleLike(method) {
    const { story, currentUser } = this.props;
    const likeInfo = { user_id: currentUser.id, story_id: story.id };
    return (e) => {
      if (method === "delete") {
        this.props.deleteLike(likeInfo);
      } else {
        this.props.createLike(likeInfo);
      }
    };
  }
  renderLikeButton() {
    const { story, currentUser } = this.props;
    if (currentUser === null) {
      return (
        <button onClick={ this.props.openAuthModal }>
          <img src={ window.images.likeEmpty } />
        </button>
      );
    } else if (story.liked_users) {
      const likedUserIds = story.liked_users.map((user) => user.id);
      if (likedUserIds.includes(currentUser.id)) {
        return (
          <button onClick={ this.toggleLike("delete").bind(this) }>
            <img src={ window.images.likeFilled } />
          </button>
        );

      } else {
        return (
          <button onClick={ this.toggleLike("create").bind(this) }>
            <img src={ window.images.likeEmpty } />
          </button>
        );

      }
    }
  }

  render() {
    const { id, title, sub_title, content,
            published_at, image_url, liked_users } =
      this.props.story;

    const { user } = this.props;

    return(
      <li className="index-item">
        <div className="index-item-profile">
          <ul className="index-item-author-info">
            <li>
              <img src={ user.avatar_url } className="story-avatar avatar" />
            </li>
            <li className="author-date-container">
              <Link to={ `/@${user.username}` }
                  className="green-button">
                {user.name}
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
                <h3 className="index-item-title">
                  {title}
                </h3>
              </li>
              <li>
                <h4 className="index-item-subtitle">
                  {sub_title}
                </h4>
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
    createLike: (like) => (dispatch(createUserLike(like))),
    deleteLike: (like) => (dispatch(deleteUserLike(like)))
  });
};

export default connect(
  null,
  mapDispatchToProps
)(UserStoryIndexItem);
