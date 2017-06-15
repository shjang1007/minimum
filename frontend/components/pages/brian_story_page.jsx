import React from "react";
import BrianStoryContainer from "../story/brian_story_container";

const TopStoryPage = (props)=> {
  return (
    <main className="site-main surface-container">
      <section className="home-container">
        <section className="home-content">
          <p>Brian's Awesome Stories</p>
          <div className="home-stories">
            <BrianStoryContainer pathname={props.location.pathname}/>
          </div>
        </section>
      </section>
    </main>
  );
};

export default TopStoryPage;
