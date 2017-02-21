import React from "react";
import { Link } from "react-router";

const UserDropDown = ({ currentUser, signOutUser }) => {
  const toggleDropDown = (e) => {
    e.currentTarget.classList.toggle("show");
  };

  return (
    <div onClick={ toggleDropDown } className="drop-down-container">
      <button>
        <img src={ currentUser.avatar_url } className="avatar" />
      </button>

      <ul className="drop-down-container">
        <li>
          <ul className="drop-down">
            <li>
              <Link to="/new-story">
                New Story
              </Link>
            </li>
            <li>
              <Link to={`/@${currentUser.username}`}>
                Profile
              </Link>
            </li>
            <li className="separator"></li>
            <li>
              <a className="gray-button" onClick={signOutUser}>
                Sign out
              </a>
            </li>
          </ul>
        </li>
        <li className="popover-arrow"></li>
      </ul>
    </div>
  );
};

export default UserDropDown;
