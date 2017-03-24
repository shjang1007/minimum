import React from "react";

const TopSideUserShowDetail = ({ user }) => {
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

export default TopSideUserShowDetail;
