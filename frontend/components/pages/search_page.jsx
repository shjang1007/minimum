import React, { Component } from "react";
import { connect } from "react-redux";
import TopStoryContainer from "../story/top_story_container";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: "" };
  }

  render() {
    return(
      <main className="site-main surface-container">
        <section className="home-container">
          <section className="home-content">
            <SearchForm />
            <Tabs />
            <div className="home-stories">
              <SearchIndex />
            </div>
          </section>
        </section>
      </main>
    );
  }
}


export default connect(
  null,
  null
)(SearchPage);
