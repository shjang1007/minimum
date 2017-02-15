import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp, receiveErrors } from "../../actions/session_actions";
import AuthForm from "./auth_form";

class signUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      firstStage: true
    });

    this.nextPage = this.nextPage.bind(this);
  }


  componentDidMount() {
    this.props.clearErrors();
  }

  nextPage(dummyInput) {
    this.setState({stage: false});
  }

  render() {
    const { signUp, errors } = this.props;
      if (this.state.firstStage) {
        return <AuthForm submitText="Sign up"
          submitForm={ this.nextPage }
          errors={ errors }/>;
      } else {
        return <p>Hello!</p>;
      }
  }
}

function mapStateToProps({ session: { errors } }) {
  return { errors };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (user) => dispatch(signUp(user)),
    clearErrors: () => dispatch(receiveErrors([]))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(signUpForm);
