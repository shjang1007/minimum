import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { signOut } from "../../actions/session_actions";
import { fetchStories, fetchTopStories, fetchBrianStories,
          updateStory, deleteStory }
        from "../../actions/story_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import UserDropDown from "./user_drop_down";
import PublishDropDownForm from "./publish_drop_down_form";
import SearchBar from "./search_bar";
import AuthModal from "../modal/auth_modal";
import DeleteModal from "../modal/delete_modal";

class MainNav extends Component {
  constructor(props) {
    super(props);

    this.signOutUser = this.signOutUser.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
  }

  signOutUser() {
    this.props.signOut().then(
      this.props.router.push("/")
    );
  }

  handleModalOpen(modalType) {
    return (e) => {
      document.getElementById("navigation-bar").classList.remove("fix");
      document.getElementById("bottom-nav-bar").classList.remove("hidden");
      document.getElementById("top-nav-bar").classList.add("fifty-height");

      if (modalType === "auth") {
        this.props.openAuthModal();
      } else {
        this.props.openDeleteModal();
      }
    };
  }

  deleteStory(storyId) {
    const { closeDeleteModal, deleteStory, router } = this.props;

    return (e) => {
      e.preventDefault();

      deleteStory(storyId).then(
        action => {
          router.push("/");
        }
      );
    };
  }

  handleNavigate(place) {
    const { router, fetchBrianStories, fetchStories, fetchTopStories }
      = this.props;

    return (e) => {
      e.preventDefault();

      if (place === "brian") {
        fetchBrianStories().then(
          action => {
            window.scrollTo(0,0);
            router.push("/brian-stories");
          }
        );
      } else if (place === "top") {
        fetchTopStories().then(
          action => {
            window.scrollTo(0,0);
            router.push("/top-stories");
          }
        );
      } else if (place === "home") {
        fetchStories().then(
          action => {
            window.scrollTo(0,0);
            router.push("/");
          }
        );
      } else {
        fetchStories(place).then(
          action => {
            window.scrollTo(0,0);
            router.push(`/tags/${place}`);
          }
        );
      }
    };
  }

  renderNotificationBell() {
    return (
      <li>
        <button className="gray-button">
          <img src={window.images.bell} className="icon bell" />
        </button>
      </li>
    );
  }

  renderComposeButton() {
    const storyId = this.props.params.storyId;
    const { currentUser } = this.props;

    if (currentUser) {
      const currentUserStoryIds = currentUser.stories.map((story) => story.id);

      if (currentUserStoryIds.includes(parseInt(storyId))) {
        return (
          <Link to={`/${storyId}/edit-story`}
          className="nav-bar-button green-button">
            Edit
          </Link>
        );
      } else {
        return (<Link to="/new-story"
            className="nav-bar-button green-button">
          Write a story
        </Link>);
      }
    }
  }

  renderRightNav() {
    const { currentUser } = this.props;
    const { pathname } = this.props.location;
    const deleteButton = pathname.includes("/edit-story") ?
      (<button className="gray-button button"
          onClick={this.props.handleModalOpen("delete")}>
        Delete Story</button>) : <div></div>;

    if (currentUser) {
      if (pathname === "/new-story" || pathname.includes("/edit-story")) {
        return (
          <ul className="right-nav-menu">
            <li className="nav-drop-button">
              <button className="nav-bar-button green-button"
                      onClick={ this.props.togglePublishDropDown }>
                Publish
              </button>
              <PublishDropDownForm
                togglePublishDropDown={ this.props.togglePublishDropDown }
                publishDropDownOpen={ this.props.publishDropDownOpen }/>
            </li>
            <li>
              { deleteButton }
            </li>
            <li>
              { this.renderNotificationBell }
            </li>
            <li className="nav-drop-button">
              <button onClick={ this.props.toggleUserDropDown }>
                <img src={ currentUser.avatar_url }
                  className="avatar" />
              </button>
              <UserDropDown
                  signOutUser={ this.signOutUser }
                  currentUser={ currentUser }
                  toggleUserDropDown={ this.props.toggleUserDropDown }
                  userDropDownOpen={ this.props.userDropDownOpen}/>
            </li>
          </ul>
        );
      } else {
        return (
          <ul className="right-nav-menu">
            <li>
              { this.renderComposeButton() }
            </li>
            <li className="searchBar">
              <SearchBar />
            </li>
            <li>
              { this.renderNotificationBell }
            </li>
            <li className="nav-drop-button">
              <button onClick={ this.props.toggleUserDropDown }>
                <img src={ currentUser.avatar_url }
                      className="avatar" />
              </button>
              <UserDropDown
                  signOutUser={ this.signOutUser }
                  currentUser={ currentUser }
                  toggleUserDropDown={ this.props.toggleUserDropDown }
                  userDropDownOpen={ this.props.userDropDownOpen}/>
            </li>
            <li>
            </li>
          </ul>
        );
      }
    } else {
      return (
        <ul className="right-nav-menu">
          <li>
            <a onClick={this.handleModalOpen("auth")}
                className="nav-bar-button gray-button">
              Write a story
            </a>
          </li>
          <li>
            <a className = "middle-button green-button"
                onClick={this.handleModalOpen("auth")}>
              Sign In/Sign Up
            </a>
          </li>
          <li>
            <SearchBar />
          </li>
        </ul>);
    }
  }

  renderBottomBar() {
    const pathname = this.props.location.pathname;

    if (pathname === "/" ||
        pathname.includes("tags") ||
        pathname.includes("top-stories") ||
        pathname.includes("brian-stories")
    ) {
      return (
        <div id="bottom-nav-bar" className="inner-bar bottom-bar">
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
    }
  }

  render() {
    const storyId = this.props.params.storyId;
    return (
      <section id="navigation-bar" className="main-nav-container">
        <header className="main-bar">
          <div id="top-nav-bar" className="inner-bar top-bar">
            <nav className="left-nav">
              <a href="/" className="logo-link">
                <img src={window.images.minimum} className="logo" />
                <img src={window.images.minimumword} className="logo-word" />
              </a>
            </nav>

            <nav className="right-nav">
              { this.renderRightNav() }
            </nav>
          </div>

          { this.renderBottomBar() }
        </header>

        <AuthModal />
        <DeleteModal deleteStory={this.deleteStory(storyId)} />

      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchStories: (tagName) => (dispatch(fetchStories(tagName))),
    fetchTopStories: () => (dispatch(fetchTopStories())),
    fetchBrianStories: () => (dispatch(fetchBrianStories())),
    signOut: () => (dispatch(signOut())),
    deleteStory: (id) => (dispatch(deleteStory(id))),
    openAuthModal: () => (dispatch(openModal("authIsOpen"))),
    closeAuthModal: () => (dispatch(closeModal("authIsOpen"))),
    openDeleteModal: () => (dispatch(openModal("deleteIsOpen"))),
    closeDeleteModal: () => (dispatch(closeModal("deleteIsOpen")))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav));
