// modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router";

// actions
import { signOut } from "../../actions/session_actions";
import { deleteStory } from "../../actions/story_actions";
import { openModal, closeModal } from "../../actions/modal_actions";

// components
import PublishDropDownForm from "./publish_drop_down_form";
import UserDropDown from "./user_drop_down";
import SearchBar from "./search_bar";
import DeleteModal from "../modal/delete_modal";

class TopRightNavBar extends Component {
  constructor(props) {
    super(props);

    this.signOutUser = this.signOutUser.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
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
      document.getElementById("top-nav-bar").classList.add("fifty-height");

      const bottomNavBar = document.getElementById("bottom-nav-bar");
      if (bottomNavBar) bottomNavBar.classList.remove("hidden");

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
        return (
          <Link to="/new-story"
            className="nav-bar-button green-button">
            Write a story
          </Link>
        );
      }
    }
  }

  render() {
    const { currentUser } = this.props;
    const { pathname } = this.props.location;
    const deleteButton = pathname.includes("/edit-story") ?
      <button className="gray-button button"
              onClick={this.handleModalOpen("delete")}>
        Delete Story
      </button>:
      null;

    if (currentUser) {
      if (pathname === "/new-story" || pathname.includes("/edit-story")) {
        const storyId = this.props.params.storyId;
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
            <li>
              <DeleteModal deleteStory={this.deleteStory(storyId)} />
            </li>
          </ul>
        );
      } else {
        return (
          <ul className="right-nav-menu">
            <li>
              { this.renderComposeButton() }
            </li>
            <li className="top-search-bar">
              <SearchBar/>
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
      }
    } else {
      return (
        <ul className="right-nav-menu">
          <li>
            <a onClick={ this.handleModalOpen("auth") }
                className="nav-bar-button gray-button">
              Write a story
            </a>
          </li>
          <li>
            <a className = "middle-button green-button"
                onClick={ this.handleModalOpen("auth") }>
              Sign In/Sign Up
            </a>
          </li>
          <li className="top-search-bar">
            <SearchBar/>
          </li>
        </ul>
      );
    }
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
    openAuthModal: () => (dispatch(openModal("authIsOpen"))),
    closeAuthModal: () => (dispatch(closeModal("authIsOpen"))),
    openDeleteModal: () => (dispatch(openModal("deleteIsOpen"))),
    closeDeleteModal: () => (dispatch(closeModal("deleteIsOpen")))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TopRightNavBar));
