import React from "react";

const UserShowDetail = ({ user, currentUser, toggleForm }) => {
  let editButton = null;
  if (user.id === currentUser.id) {
    editButton = <button type="button" onClick={ toggleForm }>Edit</button>;
  }

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
          { editButton }
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
