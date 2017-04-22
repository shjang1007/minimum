import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSearchedItems } from "../../actions/search_actions";
import SearchForm from "../search/search_form";
import SearchStoryIndex from "../search/search_story_index";
import SearchUserIndex from "../search/search_user_index";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = { showStories: true };
  }

  componentDidMount() {
    const { searchTerm } = this.props.params;
    this.props.fetchSearchedItems(searchTerm);
  }

  componentWillReceiveProps(newProps) {
    const { searchTerm } = this.props.params;

    if (searchTerm !== newProps.params.searchTerm) {
      this.props.fetchSearchedItems(newProps.params.searchTerm);
    }
  }

  render() {
    const { searchTerm } = this.props.params;
    const { currentUser } = this.props;
    const { stories, users } = this.props.items;
    const { showStories } = this.state;

    const items = showStories ?
      <SearchStoryIndex stories={ stories } currentUser={ currentUser }/> :
      <SearchUserIndex users={ users }/>;

  return(
      <main className="site-main surface-container">
        <section className="home-container">
          <section className="home-content">
            <SearchForm searchTerm={ searchTerm }/>
            <div className="tab-container">
              <ul className="tab-content">
                <li>Stories</li>
                <li>People</li>
              </ul>
            </div>
            <div className="home-stories">
              { items }
            </div>
          </section>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    currentUser: state.session.currentUser
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
