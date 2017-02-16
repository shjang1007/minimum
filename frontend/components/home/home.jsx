import React, { Component } from "react";
import { Link, withRouter } from "react-router";
import { connect } from "react-redux";
import Modal from "react-modal";
import { signOut } from "../../actions/session_actions";
import AuthSets from "../session/auth_sets";
import StoryIndex from "../story/story_index";

import customModalStyle from "./modal_style";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      modalOpen: false
    });

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.signOutUser = this.signOutUser.bind(this);
  }

  openModal () {
    this.setState({ modalOpen: true });
  }

  closeModal () {
    this.setState({ modalOpen: false});
  }

  signOutUser (e) {
    e.preventDefault();
    this.props.signOut();
  }

  signOutButton() {
    if (this.props.currentUser) {
      return <button onClick={this.signOutUser}>Sign Out</button>;
    }
  }

  render() {
    const editorSection = "Editors' picks";
    return (
      <main>
        <header className="main-bar">
          <div className="inner-bar">
            <nav className="left-nav">
              <Link to="/" className="logo-link">
                <img src={window.images.picLogo} className="logo" />
              </Link>
            </nav>

            <nav className="right-nav">
              <ul>
                <li>
                  <button className="write-story-button button gray-button">Write a story</button>
                </li>
                <li>
                  <a className = "button green-button"
                      onClick={this.openModal}>
                    Sign In/Sign Up
                  </a>
                  {this.signOutButton()}
                </li>
                <li>
                  <button className="button gray-button">
                    <i className="fa fa-search icon-2x" aria-hidden="true"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="second-inner-bar">
            <ul>
              <li>Home</li>
              <li>Top stories</li>
              <li>{editorSection}</li>
            </ul>
          </div>
        </header>

        <section className="homecontainer-stream">
          <StoryIndex />
        </section>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
          style={customModalStyle}>

            <AuthSets closeModal={this.closeModal}/>
        </Modal>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
