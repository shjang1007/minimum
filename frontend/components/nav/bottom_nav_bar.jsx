// modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// actions
import { fetchBrianStories,
          fetchStories,
          fetchTopStories } from "../../actions/story_actions";

// components
import SearchBar from "./search_bar";

class BottomNavBar extends Component {
  handleNavigate(place) {
    const { router, fetchBrianStories, fetchStories, fetchTopStories }
      = this.props;

    return (e) => {
      const bottomBarList = document.getElementById("bottom-bar-list");
      if (bottomBarList.className.includes("show")) {
        document.getElementById("bottom-bar-list")
                .classList
                .toggle("show-btm-bar");
      }

      e.preventDefault();
      switch (place) {
        case "brian":
          return fetchBrianStories().then(
            action => {
              window.scrollTo(0,0);
              router.push("/brian-stories");
            }
          );
        case "top":
          return fetchTopStories().then(
            action => {
              window.scrollTo(0,0);
              router.push("/top-stories");
            }
          );
        case "home":
          return fetchStories().then(
            action => {
              window.scrollTo(0,0);
              router.push("/");
            }
          );
        default:
          return fetchStories(place).then(
            action => {
              window.scrollTo(0,0);
              router.push(`/tags/${place}`);
            }
          );
      }
    };
  }

  toggleBottomBarList(e) {
    document.getElementById("bottom-bar-list")
            .classList
            .toggle("show-btm-bar");
  }

  render() {
    const { pathname } = this.props.location;

    if (pathname === "/" ||
        pathname.includes("tags") ||
        pathname.includes("top-stories") ||
        pathname.includes("brian-stories")
    ) {
      return (
        <div id="bottom-nav-bar" className="inner-bar bottom-bar">
          <div className="btm-bar-btn-container">
            <button className="bottom-bar-btn"
              onClick={ this.toggleBottomBarList }>
              <img src={ window.images.navMenu }/>
            </button>
            <SearchBar className="btm-search-bar"/>
          </div>
          <ul id="bottom-bar-list" className="bottom-bar-list">
            <li>
              <button onClick={ this.handleNavigate("home") }
                  className="gray-button category">
                Home
              </button>
            </li>
            <li>
              <button onClick={ this.handleNavigate("top") }
                    className="gray-button category">
                Top stories
              </button>
            </li>
            <li>
              <button onClick={ this.handleNavigate("brian") }
                    className="gray-button category">
                Brian's picks
              </button>
            </li>
            <li>
              <button onClick={ this.handleNavigate("nba") }
                    className="gray-button category">
                NBA
              </button>
            </li>
            <li>
              <button onClick={ this.handleNavigate("lol") }
                    className="gray-button category">
                League of Legends
              </button>
            </li>
            <li>
              <button onClick={ this.handleNavigate("food") }
                    className="gray-button category">
                Food
              </button>
            </li>
            <li>
              <button onClick={ this.handleNavigate("travel") }
                    className="gray-button category">
                Travel
              </button>
            </li>
            <li>
              <button onClick={ this.handleNavigate("cartoon") }
                    className="gray-button category">
                Cartoon
              </button>
            </li>
          </ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchBrianStories: () => (dispatch(fetchBrianStories())),
    fetchStories: (tagName) => (dispatch(fetchStories(tagName))),
    fetchTopStories: () => (dispatch(fetchTopStories()))
  });
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(BottomNavBar));
