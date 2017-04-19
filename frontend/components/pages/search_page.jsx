import React from "react";
import SearchForm from "../search/search_form";

const SearchPage = (props) => {
  return(
    <main className="site-main surface-container">
      <section className="home-container">
        <section className="home-content">
          <SearchForm/>
          <div>This will be tab component</div>
          <div className="home-stories">
            <div>This will be info index</div>
          </div>
        </section>
      </section>
    </main>
  );
};


export default SearchPage;
