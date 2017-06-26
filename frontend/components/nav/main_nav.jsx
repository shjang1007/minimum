// modules
import React from "react";

// components
import TopRightNavBar from "./top_right_nav_bar";
import BottomNavBar from "./bottom_nav_bar";
import AuthModal from "../modal/auth_modal";

const MainNav = ({
  togglePublishDropDown,
  publishDropDownOpen,
  toggleUserDropDown,
  userDropDownOpen
}) => {
  return (
    <section id="navigation-bar" className="main-nav-container">
      <header className="main-bar">
        <div id="top-nav-bar" className="inner-bar top-bar">
          <nav className="left-nav">
            <a href="/" className="logo-link">
              <img src={window.images.minimum} className="logo" />
              <img src={window.images.minimumword} className="logo-word" />
            </a>
          </nav>
          <nav className="right-nav">
            <TopRightNavBar togglePublishDropDown={ togglePublishDropDown }
                            publishDropDownOpen={ publishDropDownOpen }
                            toggleUserDropDown={ toggleUserDropDown }
                            userDropDownOpen={ userDropDownOpen }/>
          </nav>
        </div>
        <BottomNavBar/>
      </header>
      <AuthModal/>
    </section>
  );
};

export default (MainNav);
