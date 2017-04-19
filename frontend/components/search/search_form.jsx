import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { fetchSearchStories } from "../../actions/story_actions";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: "" };
  }

  render() {
    return(
      <form>
        <input className="search-bar"
          type="text"
          placeholder="Search Minimum"/>
      </form>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchStories: (search) => (dispatch(fetchSearchStories(search)))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchForm);
