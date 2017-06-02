import React, { Component } from "react";
import MainNav from "./nav/main_nav";

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
      // this.setState({ publishDropDownOpen: false});
      // this.setState({ userDropDownOpen: false});
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
