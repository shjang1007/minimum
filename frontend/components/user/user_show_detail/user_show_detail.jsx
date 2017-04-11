import React from "react";

const UserShowDetail = ({ user, currentUser, toggleForm }) => {
  let editButton = null;
  if (currentUser && user.id === currentUser.id) {
    editButton =
      <button type="button" onClick={ toggleForm }
              className="">
        Edit
      </button>;
  }

  return (
    <section className="top-side">
      <div className="profile">
        <div className="left-side">
          <h3 className="left-side-name">
            { user.name }
          </h3>
          <p className="left-side-description">
            { user.description }
          </p>
          { editButton }
        </div>
        <div className="right-side">
          <img src={ user.avatar_url } className="profile-avatar"/>
        </div>
      </div>
    </section>
  );
};

export default UserShowDetail;
