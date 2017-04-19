import React from "react";
import TagStoryContainer from "../story/tag_story_container";

const TagPage = (props)=> {
  const { pathname } = props.location;

  const tagName = props.params.tagName;
  let topDescription;

  if (tagName === "lol") {
    topDescription = "League of Legends";
  } else if (tagName === "nba") {
    topDescription = tagName.toUpperCase();
  } else {
    topDescription = tagName[0].toUpperCase() + tagName.slice(1);
  }

  return (
    <main className="site-main surface-container">
      <section className="home-container">
        <section className="home-content">
          <p>{ topDescription } Page</p>
          <div className="home-stories">
            <TagStoryContainer tagName={ tagName } />
          </div>
        </section>
      </section>
    </main>
  );
};

export default TagPage;
