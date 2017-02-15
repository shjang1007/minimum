import React, { Component } from "react";
import { Link, withRouter } from "react-router";
import { merge } from "lodash";

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);

    this.props.submitForm(user).then(() => this.props.closeModal());
  }

  renderErrors() {
    if (this.props.errors) {
      const errorList = this.props.errors.map((error) => (
        <li className="error" key={error}>{error}</li>
      ));

      return errorList;
    }
  }

  render() {

  }
}

export default withRouter(AuthForm);
