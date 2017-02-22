import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { signOut } from "../../actions/session_actions";
import { updateStory, deleteStory } from "../../actions/story_actions";
import Modal from "react-modal";
import customModalStyle from "./modal_style";
import UserDropDown from "./user_drop_down";
import SearchBar from "./search_bar";
import AuthSets from "../session/auth_sets";


// move modal to here, and also create class here and use it in app
class MainNav extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      authModalOpen: false,
      deleteModalOpen: false
    });

    this.openAuthModal = this.openAuthModal.bind(this);
    this.closeAuthModal = this.closeAuthModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
  }

  openAuthModal() {
    this.setState({ authModalOpen: true });
  }

  closeAuthModal() {
    this.setState({ authModalOpen: false});
  }

  openDeleteModal() {
    this.setState({ deleteModalOpen: true });
  }

  closeDeleteModal() {
    this.setState({ deleteModalOpen: false});
  }

  handlePublish() {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"
    ];
    const date = new Date();

    const story = {
      id: this.props.params.storyId,
      published: true,
      published_at: `${monthNames[date.getMonth()]} ${date.getDate()}`
    };

    return this.props.publishStory(story).then(
      this.props.router.push(`/stories/${story.id}`)
    );
  }

  signOutUser() {
    this.props.signOut().then(
      this.props.router.push("/")
    );
  }

  deleteStory(id) {
    return () => {
      this.closeDeleteModal();
      this.props.deleteStory(id).then(
        this.props.router.push("/")
      );
    };
  }

  renderComposeButton() {
    if (currentUser.stories && Object.keys(currentUser.stories).includes(storyId)) {
      return (<Link to={`/${storyId}/edit-story`}
          className="write-story-button green-button">
        Edit
      </Link>);
    } else {
      return (<Link to="/new-story"
          className="write-story-button green-button">
        Write a story
      </Link>);
    }
  }

  renderRightNav() {
    const { currentUser } = this.props;
    const pathname = this.props.location.pathname;
    const storyId = this.props.params.storyId;
    const deleteButton = pathname.includes("/edit-story") ?
      (<button className="gray-button button"
          onClick={this.openDeleteModal}>
        Delete Story</button>) : <div></div>;

    if (currentUser) {
      if (pathname === "/new-story" || pathname.includes("/edit-story")) {
        return (
          <ul className="right-nav-menu">
            <li>
              <button onClick={this.handlePublish}
                  className="write-story-button green-button">
                Publish
              </button>
            </li>
            <li>
              { deleteButton }
            </li>
            <li>
              <button className="gray-button">
                <img src={window.images.bell} className="icon bell" />
              </button>
            </li>
            <li className="nav-profile">
              <UserDropDown signOutUser={ this.signOutUser }
                  currentUser={ currentUser }/>
            </li>
          </ul>
        );
      } else {
        return (
          <ul className="right-nav-menu">
            <li>
              { this.renderComposeButton }
            </li>
            <li className="searchBar">
              <SearchBar />
            </li>
            <li>
              <button className="gray-button">
                <img src={window.images.bell} className="icon bell" />
              </button>
            </li>
            <li className="nav-profile">
              <UserDropDown signOutUser={ this.signOutUser }
                  currentUser={ currentUser }/>
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
            <a onClick={this.openAuthModal}
                className="write-story-button gray-button">
              Write a story
            </a>
          </li>
          <li>
            <a className = "middle-button green-button"
                onClick={this.openAuthModal}>
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
                <img src={window.images.logo} className="logo" />
                <img src={window.images.logoword} className="logo-word" />
              </a>
            </nav>

            <nav className="right-nav">
              { this.renderRightNav() }
            </nav>
          </div>

          { this.renderBottomBar() }
        </header>

        <Modal className="login-modal"
          isOpen={this.state.authModalOpen}
          onRequestClose={this.closeAuthModal}
          contentLabel="Modal"
          style={customModalStyle}>

          <AuthSets closeModal={this.closeAuthModal}/>
        </Modal>

        <Modal className="delete-modal"
          isOpen={this.state.deleteModalOpen}
          onRequestClose={this.closeDeleteModal}
          contentLabel="Modal"
          style={customModalStyle}>

          <div className="delete-modal">
            <h3 className="delete-modal-title">
              Delete
            </h3>
            <div className="delete-modal-content">
              Deleted stories are gone forever. Are you sure?
            </div>
            <ul className="delete-modal-buttons">
              <button className="delete-modal-button"
                onClick={this.deleteStory(storyId)}>
                Delete
              </button>
              <button className="delete-modal-button"
                  onClick={this.closeDeleteModal}>
                Cancel
              </button>
            </ul>
          </div>
        </Modal>
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
    deleteStory: (id) => (dispatch(deleteStory(id)))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav));
