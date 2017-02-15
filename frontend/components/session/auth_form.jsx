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

    this.props.submitForm(user).then(this.props.router.push("/"));
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
    const { email, password } = this.state;
    return (
      <section className="form-container">
        <ul>
          {this.renderErrors()}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            onChange={this.update("email")}
            placeholder="yourname@example.com"
            value={email} />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={this.update("password")}
            placeholder="******"
            value={password} />

          <input type="submit" value={this.props.submitText} />
        </form>
      </section>
    );
  }
}

export default withRouter(AuthForm);
