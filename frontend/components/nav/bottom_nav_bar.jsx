// modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// actions
import { fetchBrianStories,
          fetchStories,
          fetchTopStories } from "../../actions/story_actions";

class BottomNavBar extends Component {
  handleNavigate(place) {
    const { router, fetchBrianStories, fetchStories, fetchTopStories }
      = this.props;

    return (e) => {
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

  render() {
    const { pathname } = this.props.location;

    if (pathname === "/" ||
        pathname.includes("tags") ||
        pathname.includes("top-stories") ||
        pathname.includes("brian-stories")
    ) {
      return (
        <div id="bottom-nav-bar" className="inner-bar bottom-bar">
          <button className="bottom-bar-btn">Click Me</button>
          <ul>
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
