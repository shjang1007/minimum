import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchSearchedItems } from "../../actions/search_actions";

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
    const { fetchSearchedItems, router } = this.props;
    const { searchTerm } = this.state

    e.preventDefault();
    const toggleElement = e.currentTarget.parentElement.previousSibling;
    toggleElement.classList.toggle("show");

    fetchSearchedItems(searchTerm).then(
      (action) => {
        router.push(`/search/${searchTerm}`);
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
          placeholder="Search Minimum"
          value={ this.state.searchTerm }/>
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
