import React from "react";
import { Link } from "react-router";

const UserDropDown = ({ currentUser,
                        signOutUser,
                        toggleUserDropDown,
                        userDropDownOpen }) => {

  const closeDropDown = (e) => {
    if (e.target.id === "click-close") {
      toggleUserDropDown();
    }
  };

  if (userDropDownOpen) {
    return (
        <ul onClick={ closeDropDown } className="user-drop-down-container">
          <li>
            <ul className="drop-down">
              <li>
                <Link id="click-close" to="/new-story">
                  New Story
                </Link>
              </li>
              <li>
                <Link id="click-close" to="/my-stories">
                  Stories
                </Link>
              </li>
              <li className="separator"></li>
              <li>
                <Link id="click-close" className="gray-button"
                      to={`/@${currentUser.username}`}>
                  Profile
                </Link>
              </li>
              <li>
                <a id="click-close" className="gray-button"
                    onClick={signOutUser}>
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
