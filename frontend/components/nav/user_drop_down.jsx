import React from "react";

const UserDropDown = ({ currentUser, signOutUser }) => {
  const toggleDropDown = (e) => {
    e.currentTarget.classList.toggle("show");
  };

  return (
    <div onClick={ toggleDropDown } className="drop-down-container">
      <button>
        <img src={ currentUser.avatar_url } className="avatar" />
      </button>

      <ul className="drop-down">
        <li>
          New Story
        </li>
        <li>
          Profile
        </li>
        <li>
          <a className="green-button" onClick={signOutUser}>
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserDropDown;
