import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { fetchUser } from "../../actions/user_actions";

// Props has story info
class UserIndexItem extends Component {
  handleNavigate(e) {
    const { fetchUser, user, router } = this.props;
    e.preventDefault();

    fetchUser(user.username).then(
      action => {
        window.scrollTo(0,0);
        router.push(`/@${user.username}`);
      }
    );
  }

  renderDescription() {
    const { description } = this.props.user;
    if (description) {
      return(
        <p className="index-item-content search-content">
          { description }
        </p>
      );
    }
  }

  render() {
    const { id, username, name, description, avatar_url } = this.props.user;

    return(
      <li className="index-item search-index-item">
        <div className="index-item-profile">
          <ul className="index-item-author-info">
            <li>
              <button onClick={ this.handleNavigate.bind(this) }>
                <img src={ avatar_url }
                    className="story-avatar avatar search-avatar" />
              </button>
            </li>
            <li className="author-date-container search-user-text">
              <button onClick={ this.handleNavigate.bind(this) }
                  className="user-search-btn">
                {name}
              </button>
              { this.renderDescription() }
            </li>
          </ul>
        </div>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (username) => (dispatch(fetchUser(username)))
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps)(UserIndexItem));
