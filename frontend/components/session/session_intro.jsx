import React, { Component } from "react";
import SignInForm from "./sign_in_form";
import SignUpForm from "./sign_up_form";

export default class SessionIntro extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      stage: "USER_OPTIONS"
    });

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(action) {
    return (e) => {
      switch (action) {
        case "demo":
          break;
        case "signIn":
          return this.setState({stage: "SIGN_IN_FORM"});
        case "signUp":
          return this.setState({stage: "SIGN_UP_FORM"});
        default:
          break;
      }
    };
  }

  render() {
    switch (this.state.stage) {
      case "USER_OPTIONS":
        return(
          <div className="user-options">
            <ul>
              <li><button onClick={this.handleClick("demo")}>Demo Account</button></li>
              <li><button onClick={this.handleClick("signIn")}>Sign in with Email</button></li>
              <li><a onClick={this.handleClick("signUp")}>Sign up</a></li>
            </ul>
          </div>
        );
      case "SIGN_IN_FORM":
        return <SignInForm />;
      case "SIGN_UP_FORM":
        return <SignUpForm />;
      default:

    }
  }
}
