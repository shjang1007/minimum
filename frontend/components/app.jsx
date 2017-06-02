import React, { Component } from "react";
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
    // console.log(window.scrollY);
    if (window.scrollY > 30) {
      document.getElementById("navigation-bar").classList.add("fix");
      document.getElementById("bottom-nav-bar").classList.add("hidden");
      document.getElementById("top-nav-bar").classList.add("fifty-height");
    } else {
      document.getElementById("navigation-bar").classList.remove("fix");
      document.getElementById("bottom-nav-bar").classList.remove("hidden");
      document.getElementById("top-nav-bar").classList.add("fifty-height");
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
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
