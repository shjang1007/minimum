import React from "react";
import TagStoryContainer from "../story/tag_story_container";

const TagPage = (props)=> {
  const { pathname } = props.location;
  const tagName = pathname[0] === "/" ? pathname.slice(6) : pathname.slice(5);
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
