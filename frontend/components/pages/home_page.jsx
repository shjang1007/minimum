import React from "react";
import AuthSets from "../session/auth_sets";
import StoryIndexContainer from "../story/story_index_container";
import StorySideIndex from "../story/story_side_index";

const HomePage = (props)=> {
  return (
    <main className="site-main surface-container">
      <section className="home-container">
        <section className="home-content index-home-content">
          <div className="home-stories">
            <StoryIndexContainer pathname={ props.location.pathname } />
          </div>

          <section className="sidebar">
            <div className="sidbar-content">
              <ul className="sidebar-items">
                <li>
                  <section className="sidebar-header">
                    <div>Welcome to Minimum</div>
                  </section>
                  <p className="item-preview">
                    Hello there! My name is Brian Jang.
                    Minimum is a single page web application inspired by Medium.
                    Minimum is built using Ruby on Rails and React/Redux.
                    Hope you enjoy navigating around!
                  </p>
                </li>
                <li>
                  <section className="sidebar-header">
                    <div>Top Stories</div>
                  </section>
                  <StorySideIndex type="top-stories"/>
                </li>
                <li>
                  <section className="sidebar-header">
                    <div>Brian's Picks</div>
                  </section>
                  <StorySideIndex type="brian-stories"/>
                </li>
                <li>
                  <section className="sidebar-header">
                    <div>NBA</div>
                  </section>
                  <StorySideIndex tagName="nba"/>
                </li>
                <li>
                  <section className="sidebar-header">
                    <div>League of Legends</div>
                  </section>
                  <StorySideIndex tagName="lol"/>
                </li>
              </ul>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
};

export default HomePage;
