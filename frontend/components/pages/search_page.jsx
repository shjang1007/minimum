import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSearchedItems } from "../../actions/search_actions";
import SearchForm from "../search/search_form";

class SearchPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { searchTerm } = this.props.params;
    this.props.fetchSearchedItems(searchTerm);
  }

  render() {
    const { searchTerm } = this.props.params;

    return(
      <main className="site-main surface-container">
        <section className="home-container">
          <section className="home-content">
            <SearchForm searchTerm={ searchTerm }/>
            <div>This will be tab component</div>
            <div className="home-stories">
              <div>This will be info index</div>
            </div>
          </section>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchedItems:
      (searchTerm) => (dispatch(fetchSearchedItems(searchTerm)))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
