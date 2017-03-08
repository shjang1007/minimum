import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { signOut } from "../../actions/session_actions";
import { updateStory, deleteStory } from "../../actions/story_actions";
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

  // handlePublish() {
  //   const monthNames = [
  //     "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  //     "Oct", "Nov", "Dec"
  //   ];
  //   const date = new Date();
  //
  //   const story = {
  //     id: this.props.params.storyId,
  //     published: true,
  //     published_at: `${monthNames[date.getMonth()]} ${date.getDate()}`
  //   };
  //
  //   return this.props.publishStory(story).then(
  //     this.props.router.push(`/stories/${story.id}`)
  //   );
  // }

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

  renderComposeButton() {
    const storyId = this.props.params.storyId;
    const { currentUser } = this.props;

    if (currentUser !== null &&
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
                publishDropDownOpen={ this.props.publishDropDownOpen }
                publishStory={ this.publishStory}
                storyId={this.props.params.storyId}
                router={this.router}/>
            </li>
            <li>
              { deleteButton }
            </li>
            <li>
              <button className="gray-button">
                <img src={window.images.bell} className="icon bell" />
              </button>
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
              <button className="gray-button">
                <img src={window.images.bell} className="icon bell" />
              </button>
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
            <SearchBar />
          </li>
        </ul>);
    }
  }

  renderBottomBar() {
    const pathname = this.props.location.pathname;
    const editorSection = "Editors' picks";
    if (pathname === "/") {
      return (
        <div className="inner-bar bottom-bar">
          <ul>
            <li><button className="gray-button category">Home</button></li>
            <li><button className="gray-button category">Top stories</button></li>
            <li><button className="gray-button category">{editorSection}</button></li>
            <li><button className="gray-button category">Politics</button></li>
            <li><button className="gray-button category">Technology</button></li>
            <li><button className="gray-button category">Humans</button></li>
            <li><button className="gray-button category">Culture</button></li>
            <li><button className="gray-button category">Business</button></li>
            <li><button className="gray-button category">Entertainment</button></li>
            <li><button className="gray-button category">Bookmarks</button></li>
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
    publishStory: (story) => (dispatch(updateStory(story))),
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
