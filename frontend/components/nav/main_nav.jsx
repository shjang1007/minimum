import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { signOut } from "../../actions/session_actions";
import { updateStory, deleteStory, clearStory } from "../../actions/story_actions";
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
  }

  signOutUser() {
    this.props.signOut().then(
      this.props.router.push("/")
    );
  }

  deleteStory(storyId) {
    return () => {
      this.props.closeDeleteModal();
      this.props.deleteStory(storyId).then(
        this.props.router.push("/")
      );
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
    if (currentUser !== null && currentUser.stories &&
      Object.keys(currentUser.stories).includes(storyId)) {
      return (<Link to={`/${storyId}/edit-story`}
          className="nav-bar-button green-button">
        Edit
      </Link>);
    } else {
      return (<Link to="/new-story"
          className="nav-bar-button green-button">
        Write a story
      </Link>);
    }
  }

  renderRightNav() {
    const { currentUser } = this.props;
    const pathname = this.props.location.pathname;
    const deleteButton = pathname.includes("/edit-story") ?
      (<button className="gray-button button"
          onClick={this.props.openDeleteModal}>
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
              { this.searchBar }
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
            <a onClick={this.props.openAuthModal}
                className="nav-bar-button gray-button">
              Write a story
            </a>
          </li>
          <li>
            <a className = "middle-button green-button"
                onClick={this.props.openAuthModal}>
              Sign In/Sign Up
            </a>
          </li>
          <li>
            { this.renderSearch }
          </li>
        </ul>);
    }
  }

  renderBottomBar() {
    const pathname = this.props.location.pathname;
    const { clearStory } = this.props;

    if (pathname === "/" ||
        pathname.includes("tags") ||
        pathname.includes("top-stories") ||
        pathname.includes("brian-stories")
    ) {
      return (
        <div className="inner-bar bottom-bar">
          <ul>
            <li>
              <Link to="/" onClick= { clearStory }
                    className="gray-button category">
                Home
              </Link>
          </li>
            <li>
              <Link to="/top-stories" onClick={ clearStory }
                    className="gray-button category">
                Top stories
              </Link>
          </li>
            <li>
              <Link to="/brian-stories" onClick= { clearStory }
                    className="gray-button category">
                Brian's picks
              </Link>
            </li>
            <li>
              <Link to="tags/nba" onClick= { clearStory }
                    className="gray-button category">
                NBA
              </Link>
            </li>
            <li>
              <Link to="tags/lol" onClick= { clearStory }
                    className="gray-button category">
                League of Legends
              </Link>
            </li>
            <li>
              <Link to="tags/food" onClick= { clearStory }
                    className="gray-button category">
                Food
              </Link>
            </li>
            <li>
              <Link to="tags/travel" onClick= { clearStory }
                    className="gray-button category">
                Travel
              </Link>
            </li>
            <li>
              <Link to="tags/cartoon" onClick= { clearStory }
                    className="gray-button category">
                Cartoon
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  }

  render() {
    const storyId = this.props.params.storyId;
    return (
      <section className="main-nav-container">
        <header className="main-bar">
          <div className="inner-bar top-bar">
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
    signOut: () => (dispatch(signOut())),
    deleteStory: (id) => (dispatch(deleteStory(id))),
    clearStory: () => (dispatch(clearStory())),
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
