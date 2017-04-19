import React from "react";

const SearchBar = (props) => {
  const toggleSearchBar = (e) => {
    e.currentTarget.classList.toggle("show");
    e.currentTarget.parentElement.lastElementChild.focus();
  };

  return (
    <form className="search-container">
      <button onClick={ toggleSearchBar }
          className="search-button gray-button">
        <img src={window.images.magnifier} className="icon" />
      </button>
      <input className="search-bar"
        type="text"
        placeholder="Search Minimum"/>
  </form>
  );
};

export default SearchBar;
