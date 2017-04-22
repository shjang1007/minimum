import React, { Component } from "react";
import { Link } from "react-router";

// Props has story info
class UserIndexItem extends Component {
  renderDescription() {
    const { description } = this.props.user;
    if (description) {
      return(
        <li>
          <p className="index-item-content">
            { description }
          </p>
        </li>
      );
    }
  }

  render() {
    const { id, username, name, description, avatar_url } = this.props.user;

    return(
      <li className="index-item">
        <div className="index-item-profile">
          <ul className="index-item-author-info">
            <li>
              <Link to={ `/@${username}` }>
                <img src={ avatar_url }
                    className="story-avatar avatar" />
              </Link>
            </li>
            <li className="author-date-container">
              <Link to={ `/@${username}` }
                  className="green-button">
                {name}
              </Link>
            </li>
            { this.renderDescription() }
          </ul>
        </div>
      </li>
    );
  }
}

export default UserIndexItem;
