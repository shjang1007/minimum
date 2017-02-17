import React, { Component } from "react";
import { Link, withRouter } from "react-router";
import { connect } from "react-redux";
import Modal from "react-modal";
import { signOut } from "../../actions/session_actions";
import AuthSets from "../session/auth_sets";
import StoryIndex from "../story/story_index";
import MainNav from "../nav/main_nav";

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

  render() {
    return (
      <main className="site-main surface-container">

        <section className="main-nav-container">
          <MainNav currentUser= {this.props.currentUser}
              openModal={this.openModal}
              signOutUser = {this.signOutUser}/>
        </section>

        <section className="home-container">
          <section className="home-content">
            <div className="home-stories">
              <StoryIndex />
            </div>

            <div className="sidebar">
              <ul>
                <li>Top Stories</li>
                <li>My Stories</li>
                <li>Super Stories</li>
                <li>Babyshark Stories</li>
              </ul>
            </div>
          </section>
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
