import React from "react";
import TopStoryContainer from "../story/top_story_container";

const TopStoryPage = (props)=> {
  return (
    <main className="site-main surface-container">
      <section className="home-container">
        <section className="home-content">
          <p>Most Liked Stories</p>
          <div className="home-stories">
            <TopStoryContainer pathname={props.location.pathname}/>
          </div>
        </section>
      </section>
    </main>
  );
};

export default TopStoryPage;
