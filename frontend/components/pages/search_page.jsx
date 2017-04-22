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

    this.handleClick = this.handleClick.bind(this);
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

  handleClick(tab) {
    const { showStories } = this.state;
    const storyButton = document.getElementById("search-nav-stories");
    const peopleButton = document.getElementById("search-nav-people");

    return (e) => {
      if (tab === "stories") {
        this.setState({ showStories: true });
        storyButton.classList.toggle("black");
        peopleButton.classList.toggle("black");
      } else {
        this.setState({ showStories: false });
        storyButton.classList.toggle("black");
        peopleButton.classList.toggle("black");
      }
    };
  }

  render() {
    const { searchTerm } = this.props.params;
    const { currentUser } = this.props;
    const { stories, users } = this.props.items;
    const { showStories } = this.state;

    const items = showStories ?
      <SearchStoryIndex stories={ stories } currentUser={ currentUser }/> :
      <SearchUserIndex users={ users } currentUser={ currentUser }/>;

    return(
        <main className="site-main surface-container">
          <section className="search-page">
            <section className="home-content search-page-content">
              <SearchForm searchTerm={ searchTerm }/>
              <div className="tab-container">
                <ul className="tab-content">
                  <li>
                    <button className="black" id="search-nav-stories"
                        onClick={ this.handleClick("stories") }>
                      Stories
                    </button>
                  </li>
                  <li>
                    <button id="search-nav-people"
                        onClick={ this.handleClick("people") }>
                      People
                    </button>
                  </li>
                </ul>
              </div>
              <div className="home-stories search-items">
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
