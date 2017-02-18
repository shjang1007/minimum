import React from "react";
import { Link } from "react-router";
import UserDropDown from "./user_drop_down";
import SearchBar from "./search_bar";

const MainNav = ({ router, openModal, currentUser, signOutUser }) => {
  let rightNav;
  if (currentUser) {
    rightNav = (
      <ul>
        <li>
          <Link to="/new-story"
              className="write-story-button gray-button">
            Write a story
          </Link>
        </li>
        <li className="searchBar">
          <SearchBar />
        </li>
        <li>
          <button className="gray-button">
            <img src={window.images.bell} className="icon bell" />
          </button>
        </li>
        <li className="nav-profile">
          <UserDropDown signOutUser={ signOutUser }
              currentUser={ currentUser }/>
        </li>
        <li>
        </li>
      </ul>
    );
  } else {
    rightNav = (
      <ul>
        <li>
          <Link to="/new-story"
              className="write-story-button gray-button">
            Write a story
          </Link>
        </li>
        <li>
          <a className = "middle-button green-button"
              onClick={openModal}>
            Sign In/Sign Up
          </a>
        </li>
        <li>
          <SearchBar />
        </li>
      </ul>);
  }

  const editorSection = "Editors' picks";
  return (
    <header className="main-bar">
      <div className="inner-bar top-bar">
        <nav className="left-nav">
          <a href="/" className="logo-link">
            <img src={window.images.logo} className="logo" />
            <img src={window.images.logoword} className="logo-word" />
          </a>
        </nav>

        <nav className="right-nav">
          {rightNav}
        </nav>
      </div>
      <div className="inner-bar bottom-bar">
        <ul>
          <li><button className="gray-button category">Home</button></li>
          <li><button className="gray-button category">Top stories</button></li>
          <li><button className="gray-button category">{editorSection}</button></li>
          <li><button className="gray-button category">Politics</button></li>
          <li><button className="gray-button category">Technology</button></li>
          <li><button className="gray-button category">Humans</button></li>
          <li><button className="gray-button category">Culture</button></li>
          <li><button className="gray-button category">Business</button></li>
          <li><button className="gray-button category">Entertainment</button></li>
          <li><button className="gray-button category">Bookmarks</button></li>
        </ul>
      </div>
    </header>
  );
};

export default MainNav;
