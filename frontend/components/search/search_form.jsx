import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchSearchedItems } from "../../actions/search_actions";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: "" };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleSubmit(e) {
    const { fetchSearchedItems, router } = this.props;

    e.preventDefault();
    const toggleElement = e.currentTarget.parentElement.previousSibling;
    toggleElement.classList.toggle("show");

    fetchSearchedItems(this.state.searchTerm).then(
      (action) => {
        router.push("/search");
      }
    );
    // Make sure to clear search input after submitting
    // Fetch and ship to search page
  }

  render() {
    return(
      <form>
        <input className="search-bar"
          type="text"
          onChange={ this.update }
          placeholder="Search Minimum"/>
        <button onClick={ this.handleSubmit } type="submit"/>
      </form>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchedItems: (searchTerm) => (dispatch(fetchSearchedItems(searchTerm)))
  };
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(SearchForm));
