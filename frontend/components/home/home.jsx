import React, { Component } from "react";
import { Link, withRouter } from "react-router";
import Modal from "react-modal";
import SessionIntro from "../session/session_intro";

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
                <img src="/assets/medium-logo.svg" className="logo" />
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

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Modal">
          <button onClick={this.closeModal}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>

          <SessionIntro closeModal={this.closeModal}/>
        </Modal>

      </main>
    );
  }
}

export default Home;
