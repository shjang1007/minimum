import React from "react";
import BrianStoryContainer from "../story/brian_story_container";

const TopStoryPage = (props)=> {
  return (
    <main className="site-main surface-container">
      <section className="home-container">
        <section className="home-content">
          <div className="home-stories">
            <BrianStoryContainer />
          </div>
        </section>
      </section>
    </main>
  );
};

export default TopStoryPage;
