import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { signIn, receiveErrors } from "../../actions/session_actions";
import AuthForm from "./auth_form";

class signInForm extends Component {

  componentDidMount() {
    this.props.clearErrors();
  }

  render() {
    const { signIn, errors } = this.props;
    return (
      <section>
        <AuthForm submitText="Sign in" submitForm={ signIn } errors={ errors }/>
      </section>
    );
  }
}

function mapStateToProps({ session: { errors } }) {
  return { errors };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (user) => dispatch(signIn(user)),
    clearErrors: () => dispatch(receiveErrors([]))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(signInForm);
