import React from "react";

const UserShowDetail = ({ user, currentUser, toggleForm, renderFollowButton }) => {
  const editButton =
    <button type="button" onClick={ toggleForm }
            className="profile-btn">
      Edit
    </button>;

  const followButton = renderFollowButton();

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
          <ul className="left-side-description follow-info">
            <li>
              <p>
                { user.followers.length } Following
              </p>
            </li>
            <li>
              <p>
                { user.followees.length } Followers
              </p>
            </li>
          </ul>
          { currentUser && user.id === currentUser.id ?
            editButton : followButton }
        </div>
        <div className="right-side">
          <img src={ user.avatar_url } className="profile-avatar"/>
        </div>
      </div>
    </section>
  );
};

export default UserShowDetail;
