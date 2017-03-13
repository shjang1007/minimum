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
            <StoryIndexContainer />
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
                  <div>
                    <ul className="item-preview">
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
                    </ul>
                  </div>
                </li>
                <li>
                  <section className="sidebar-header">
                    <div>Brian's Picks</div>
                  </section>
                  <div>
                    <ul className="item-preview">
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
                    </ul>
                  </div>
                </li>
                <li>
                  <section className="sidebar-header">
                    <div>NBA</div>
                  </section>
                  <div className="item-preview">
                    <ul className="item-preview">
                      <StorySideIndex tagName="nba"/>
                    </ul>
                  </div>
                </li>
                <li>
                  <section className="sidebar-header">
                    <div>League of Legends</div>
                  </section>
                  <div className="item-preview">
                    <ul className="item-preview">
                      <StorySideIndex tagName="lol"/>
                    </ul>
                  </div>
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
