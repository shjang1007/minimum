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

    this.togglePage = this.togglePage.bind(this);
  }

  togglePage(action) {
    return (e) => {
      switch (action) {
        case "demo":
          return this.props.signIn({
              email: "guest@example.com",
              password: "123456"}).then(
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
          <section className="authsets-container">
            <div className="overlay-title">
              <div className="auth-logo-set">
                <img src={window.images.minimum} className="auth-logo-pic" />
                <img src={window.images.minimumword} className="auth-logo-word" />
              </div>
            </div>
            <div className="overlay-content">
              Sign in to Minimum to connect with voices and perspectives that matter.
            </div>

            <div className="auth-sets">
              <button className="auth-button guest-button"
                  onClick={this.togglePage("demo")}>
                Continue with Guest Account
              </button>
              <button className="auth-button signin-button"
                  onClick={this.togglePage("signIn")}>
                Sign in with E-mail
              </button>
              <button className="auth-button signup-button"
                  onClick={this.togglePage("signUp")}>
                Sign up with E-mail
              </button>
            </div>

            <div className="auth-privacy-msg">
              <div>
                To use Minimum you must be determined
              </div>
              <div>
                If you sign up with Twitter of Facebook, I will be surprised, because there are no options to allow users to sign up using Twitter or Facebook. However, if you do get it done, we'll never post to Twitter or Facebook without your permission. For more info, please text me.
              </div>
            </div>
          </section>
        );
      case "SIGN_IN_FORM":
        return (
          <section className="sign-in-form">
            <h3 className="overlay-title">
              Enter your email address and password to sign in to Minimum
            </h3>
            <div className="overlay-content">
              <SignInForm closeModal={this.props.closeModal}
                          togglePage={this.togglePage("signUp")}/>
            </div>
          </section>
        );
      case "SIGN_UP_FORM":
        return (
          <section className="sign-in-form">
            <h3 className="overlay-title">
              Almost there, fill in the form to create an account
            </h3>
            <div className="overlay-content">
              <SignUpForm closeModal={this.props.closeModal}
                          togglePage={this.togglePage("signIn")}/>
            </div>
          </section>
        );
      default:
        break;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (user) => dispatch(signIn(user))
  };
}

export default connect(null, mapDispatchToProps)(AuthSets);
