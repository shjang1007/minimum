import React from "react";
import AuthSets from "../session/auth_sets";
import TagStoryContainer from "../story/tag_story_container";

const TagPage = (props)=> {
  const { pathname } = props.location;
  const tagName = pathname[0] === "/" ? pathname.slice(6) : pathname.slice(5);
  return (
    <main className="site-main surface-container">
      <section className="home-container">
        <section className="home-content">
          <div className="home-stories">
            <TagStoryContainer tagName={ tagName } />
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
                    <div>My stories</div>
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
                    <div>Super Stories</div>
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
                    <div>Babyshark Stories</div>
                  </section>
                  <div>
                    <ul className="item-preview">
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
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

export default TagPage;
