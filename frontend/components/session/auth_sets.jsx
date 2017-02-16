import React, { Component } from "react";
import { connect } from "react-redux";
import SignInForm from "./sign_in_form";
import SignUpForm from "./sign_up_form";

import { signIn } from "../../actions/session_actions";

class AuthSets extends Component {
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
            <div className="aut-sets">
              <button className="auth-button"
                  onClick={this.handleClick("demo")}>
                Continue with Guest Account
              </button>
              <button className="auth-button"
                  onClick={this.handleClick("signIn")}>
                Sign in with E-mail
              </button>
              <button className="auth-button"
                  onClick={this.handleClick("signUp")}>
                Sign up with E-mail
              </button>
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

export default connect(null, mapDispatchToProps)(AuthSets);
