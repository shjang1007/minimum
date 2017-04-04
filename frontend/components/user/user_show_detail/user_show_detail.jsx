import React from "react";

const UserShowDetail = ({ user, currentUser, toggleForm }) => {
  let editButton = null;
  if (user.id === currentUser.id) {
    editButton = <button type="button" onClick={ toggleForm }>Edit</button>;
  }
  // Add {editButton} in between line 19 and 20. For production pushing without it
  // Need to add user profile add too.
  return (
    <section className="top-side">
      <div className="profile">
        <div className="left-side">
          <h3 className="left-side-name">
            { user.name }
          </h3>
          <p className="left-side-description">
            Hello! Welcome to { user.name } page.
          </p>
        </div>
        <div className="right-side">
          <img src={ user.avatar_url } className="profile-avatar"/>
        </div>
      </div>
      <div className="mini-nav">
        <ul>
          <li>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default UserShowDetail;
