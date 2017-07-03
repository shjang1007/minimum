import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import MainNav from "./nav/main_nav";
import { throttle } from "lodash";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      publishDropDownOpen: false,
      userDropDownOpen: false
    });

    this.togglePublishDropDown = this.togglePublishDropDown.bind(this);
    this.toggleUserDropDown = this.toggleUserDropDown.bind(this);
    this.closeDropDowns = this.closeDropDowns.bind(this);
    this.scrollNavBar = this.scrollNavBar.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", throttle(this.scrollNavBar, 500));
  }

  togglePublishDropDown() {
    if (this.state["publishDropDownOpen"]) {
      this.setState({ publishDropDownOpen: false});

    } else {
      this.setState({ publishDropDownOpen: true});
    }
  }

  toggleUserDropDown() {
    if (this.state["userDropDownOpen"]) {
      this.setState({ userDropDownOpen: false});

    } else {
      this.setState({ userDropDownOpen: true});
    }
  }

  closeDropDowns(e) {
    const { publishDropDownOpen, userDropDownOpen } = this.state;
    const anyOpen = publishDropDownOpen || userDropDownOpen;
    if (anyOpen && !e.target.classList.contains("close-drop-down-immune")) {
      const dropDownToClose = publishDropDownOpen ?
                                "publishDropDownOpen" :
                                "userDropDownOpen";

      this.setState({ [dropDownToClose]: false});
    }
  }

  scrollNavBar(e) {
    const bottomNavBar = document.getElementById("bottom-nav-bar");
    const topNavBar = document.getElementById("top-nav-bar");
    const navigationBar = document.getElementById("navigation-bar");
    const handleJump = document.getElementById("handle-jump");
    const heightToAdd = bottomNavBar ? "add-height-102" : "add-height-65";
    if (window.scrollY > 100 && !this.props.anyModalOpen) {
      navigationBar.classList.add("fix");
      topNavBar.classList.add("fifty-height");
      handleJump.classList.add(heightToAdd);

      if (bottomNavBar) bottomNavBar.classList.add("hidden");
    } else {
      navigationBar.classList.remove("fix");
      topNavBar.classList.remove("fifty-height");
      handleJump.classList.remove(heightToAdd);
      if (bottomNavBar) bottomNavBar.classList.remove("hidden");
    }
  }

  render() {
    return(
      <div onClick={ this.closeDropDowns }>
        <MainNav togglePublishDropDown={ this.togglePublishDropDown }
                publishDropDownOpen={ this.state["publishDropDownOpen"] }
                toggleUserDropDown={ this.toggleUserDropDown }
                userDropDownOpen={ this.state["userDropDownOpen"] }/>
        <div>
          <div id="handle-jump"></div>
          { this.props.children }
          <div>hello</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { authIsOpen, deleteIsOpen } = state.modal;

  return ({
    anyModalOpen: authIsOpen || deleteIsOpen
  });
};

export default connect(
  mapStateToProps
)(App);
