import React from "react";
import AuthSets from "../session/auth_sets";
import StoryIndexContainer from "../story/story_index_container";
import StorySideIndex from "../story/story_side_index";

const HomePage = (props)=> {
  return (
    <main className="site-main surface-container">
      <section className="home-container">
        <section className="home-content">
          <div className="home-stories">
            <StoryIndexContainer pathname={ props.location.pathname } />
          </div>

          <section className="sidebar">
            <div className="sidbar-content">
              <div className="welcome">
                Welcome to Minimum
              </div>
              <ul className="sidebar-items">
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
                  <ul className="item-preview">
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                  </ul>
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
