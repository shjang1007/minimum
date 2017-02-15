import React, { Component } from "react";
import { connect } from "react-redux";
import SignInForm from "./sign_in_form";
import SignUpForm from "./sign_up_form";

import { signIn } from "../../actions/session_actions";

class SessionIntro extends Component {
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
          return this.props.signIn({email: "guest@example.com", password: "123456"}).then(
            () => this.props.closeModal()
          );
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
        return <SignInForm closeModal={this.props.closeModal}/>;
      case "SIGN_UP_FORM":
        return <SignUpForm closeModal={this.props.closeModal}/>;
      default:

    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (user) => dispatch(signIn(user))
  };
}

export default connect(null, mapDispatchToProps)(SessionIntro);
