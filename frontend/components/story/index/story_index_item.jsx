import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { values } from "lodash";
import { fetchStory } from "../../../actions/story_actions";
import { fetchUser } from "../../../actions/user_actions";
import { createLike, deleteLike } from "../../../actions/like_actions";

// Props has story info
class StoryIndexItem extends Component {
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

  handleNavigate(place) {
    const { router, fetchStory, fetchUser } = this.props;
    const { story } = this.props;

    return (e) => {
      e.preventDefault();

      if (place === "parent") {
        fetchStory(story.parent_id).then(
          action => {
            window.scrollTo(0,0);
            router.push(`/stories/${story.parent_id}`);
          }
        );
      } else if (place === "author") {
        const { username } = story.author;
        fetchUser(username).then(
          action => {
            window.scrollTo(0,0);
            router.push(`/@${username}`);
          }
        );
      } else {
        fetchStory(story.id).then(
          action => {
            window.scrollTo(0,0);
            router.push(`/stories/${story.id}`);
          }
        );
      }
    };
  }

  renderParentSummary() {
    const { story } = this.props;
    if (story.parent_story) {
      const { parent_story } = story;
        return(
          <button onClick={ this.handleNavigate("parent").bind(this) }>
            <ul className="parent-story-container">
              <li>{ parent_story.title }</li>
              <li>{ parent_story.author.name }</li>
            </ul>
          </button>
        );
    }
  }

  renderContent() {
    const { story } = this.props;
    if (!story.title && !story.sub_title) {
        return(
          <li>
            <p className="index-item-content">
              { story.content }
            </p>
          </li>
        );
    }
  }

  renderLikeButton() {
    const { story, currentUser } = this.props;

    if (currentUser === null) {
      return (
        <button onClick={ this.props.openAuthModal }>
          <img src={ window.images.likeEmpty } />
        </button>
      );
    } else if (story.liked_users &&
        Object.keys(story.liked_users).includes(currentUser.id.toString())) {
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
    const { id, title, sub_title, content, author,
            published_at, image_url, liked_users } =
      this.props.story;

    const displayTitle = title ?
      (<li>
        <h3 className="index-item-title">
          {title}
        </h3>
      </li>) : "";

    const displaySubTitle = title ?
      (<li>
        <h4 className="index-item-subtitle">
          {sub_title}
        </h4>
      </li>) : "";

    return(
      <li className="index-item">
        <div className="index-item-profile">
          <ul className="index-item-author-info">
            <li>
              <button onClick={ this.handleNavigate("author").bind(this) }>
                <img src={ author.avatar_url }
                    className="story-avatar avatar" />
                </button>
            </li>
            <li className="author-date-container">
              <button onClick={ this.handleNavigate("author").bind(this) }
                  className="green-button">
                {author.name}
              </button>
              <button onClick={ this.handleNavigate().bind(this) }
                  className="gray-button">
                {published_at}
              </button>
            </li>
          </ul>
        </div>
        <div className="index-item-content">
          { this.renderParentSummary() }
          <button onClick={ this.handleNavigate().bind(this) }
              className="gray-button">
            <ul className="content-detail">
              <li>
                <img src={ image_url } className="index-item-image"/>
              </li>
              { displayTitle }
              { displaySubTitle }
              { this.renderContent() }
            </ul>
          </button>
        </div>
        <button onClick={ this.handleNavigate().bind(this) }
            className="story-index-readmore">
          Read more...
        </button>
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
    fetchStory: (id) => (dispatch(fetchStory(id))),
    fetchUser: (username) => (dispatch(fetchUser(username))),
    createLike: (like) => (dispatch(createLike(like))),
    deleteLike: (like) => (dispatch(deleteLike(like)))
  });
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(StoryIndexItem));
