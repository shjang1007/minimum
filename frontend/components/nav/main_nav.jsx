import React from "react";

const MainNav = ({ openModal, currentUser, signOutUser }) => {
  let rightNav;
  if (currentUser) {
    rightNav = (
      <ul>
        <li>
          <button className="write-story-button gray-button">Write a story</button>
        </li>
        <li>
          <button className="gray-button">
            <img src={window.images.magnifier} className="icon" />
          </button>
        </li>
        <li>
          <button className="gray-button">
            <img src={window.images.bell} className="icon bell" />
          </button>
        </li>
        <li className="nav-profile">
          <a className="green-button" onClick={signOutUser}>Sign out</a>
        </li>
      </ul>
    )
  } else {
    rightNav = (
      <ul>
        <li>
          <button className="write-story-button gray-button">Write a story</button>
        </li>
        <li>
          <a className = "middle-button green-button"
              onClick={openModal}>
            Sign In/Sign Up
          </a>
        </li>
        <li>
          <button className="gray-button">
            <img src={window.images.magnifier} className="icon" />
          </button>
        </li>
      </ul>)
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
