import React from "react";
import { Link } from "react-router";

const UserDropDown = ({ currentUser, signOutUser, userDropDownOpen }) => {
  if (userDropDownOpen) {
    return (
        <ul className="drop-down-container drop-down-part">
          <li>
            <ul className="drop-down">
              <li>
                <Link to="/new-story">
                  New Story
                </Link>
              </li>
              <li>
                <Link to="/me/stories/drafts">
                  Stories
                </Link>
              </li>
              <li className="separator"></li>
              <li>
                <Link className="gray-button" to={`/@${currentUser.username}`}>
                  Profile
                </Link>
              </li>
              <li>
                <a className="gray-button" onClick={signOutUser}>
                  Sign out
                </a>
              </li>
            </ul>
          </li>
          <li className="popover-arrow"></li>
        </ul>
    );
  } else {
    return null;
  }
};

export default UserDropDown;
