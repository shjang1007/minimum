import React from "react";

const SearchBar = (props) => {
  const toggleSearchBar = (e) => {
    e.currentTarget.classList.toggle("show");
  };

  return (
    <div className="search-container">
      <button onClick={ toggleSearchBar }
          className="search-button gray-button">
        <img src={window.images.magnifier} className="icon" />
      </button>

      <input className="search-bar" 
          placeholder="Search Minimum" />
    </div>
  );
};

export default SearchBar;