import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    if(props.searchTerm) {
      this.state = { searchTerm: props.searchTerm };
    } else {
      this.state = { searchTerm: "" };
    }

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchTerm !== nextProps.searchTerm ) {
      this.setState({ searchTerm: nextProps.searchTerm });
    }
  }

  update(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleSubmit(e) {
    const { router } = this.props;
    const { searchTerm } = this.state;

    e.preventDefault();

    // If the search form is in the nav bar, toggle to close the search form
    const toggleElement = e.currentTarget.parentElement.previousSibling;
    if (toggleElement) {
      toggleElement.classList.toggle("show");
    }

    // Push to the search form
    router.push(`/search/${searchTerm}`);
    // Clear search after
    this.setState({ searchTerm: "" });
  }

  render() {
    return(
      <form>
        <input className="search-bar"
          type="text"
          onChange={ this.update }
          placeholder="Search Minimum"
          value={ this.state.searchTerm }/>
        <button onClick={ this.handleSubmit } type="submit"/>
      </form>
    );
  }
}

export default withRouter((SearchForm));
