import React from "react";
import AuthSets from "../session/auth_sets";
import TopStoryContainer from "../story/top_story_container";

const TopStoryPage = (props)=> {
  return (
    <main className="site-main surface-container">
      <section className="home-container">
        <section className="home-content">
          <div className="home-stories">
            <TopStoryContainer />
          </div>
        </section>
      </section>
    </main>
  );
};

export default TopStoryPage;
