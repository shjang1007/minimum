import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { signOut } from "../../actions/session_actions";
import { updateStory } from "../../actions/story_actions";
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
      modalOpen: false
    });

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false});
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

  renderRightNav() {
    const { currentUser, signOutUser } = this.props;
    const pathname = this.props.location.pathname;

    if (currentUser) {
      if (pathname === "/new-story" || pathname.includes("/edit-story")) {
        return (
          <ul>
            <li>
              <button onClick={this.handlePublish}
                  className="write-story-button gray-button">
                Publish
              </button>
            </li>
            <li>
              <button className="gray-button">
                <img src={window.images.bell} className="icon bell" />
              </button>
            </li>
            <li className="nav-profile">
              <UserDropDown signOutUser={ signOutUser }
                  currentUser={ currentUser }/>
            </li>
            <li>
            </li>
          </ul>
        );
      } else {
        return (
          <ul>
            <li>
              <Link to="/new-story"
                  className="write-story-button gray-button">
                Write a story
              </Link>
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
              <UserDropDown signOutUser={ signOutUser }
                  currentUser={ currentUser }/>
            </li>
            <li>
            </li>
          </ul>
        );
      }
    } else {
      return (
        <ul>
          <li>
            <a onClick={this.openModal}
                className="write-story-button gray-button">
              Write a story
            </a>
          </li>
          <li>
            <a className = "middle-button green-button"
                onClick={this.openModal}>
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
      )
    }
  }

  render() {
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

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
          style={customModalStyle}>

          <AuthSets closeModal={this.closeModal}/>
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
    signOutUser: () => (dispatch(signOut())),
    publishStory: (story) => (dispatch(updateStory(story)))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav));
