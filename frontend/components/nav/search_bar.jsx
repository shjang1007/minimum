import React from "react";
import SearchForm from "../search/search_form.jsx";

const SearchBar = (props) => {
  const toggleSearchBar = (e) => {
    e.currentTarget.classList.toggle("show");
    e.currentTarget.parentElement.lastElementChild.firstElementChild.focus();
  };

  return (
    <div className="search-container">
      <button onClick={ toggleSearchBar }
          className="search-button gray-button">
        <img src={window.images.magnifier} className="icon" />
      </button>
      <SearchForm />
    </div>
  );
};

export default SearchBar;
