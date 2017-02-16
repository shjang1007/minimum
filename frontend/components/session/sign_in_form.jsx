import React, { Component } from "react";
import { connect } from "react-redux";
import { merge } from "lodash";
import { signIn, receiveErrors } from "../../actions/session_actions";

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      email: "",
      password: ""
    });

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);

    this.props.signIn(user).then(() => this.props.closeModal());
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  renderErrors() {
    if (this.props.errors) {
      return this.props.errors.map((error) => (
        <li className="error" key={error}>{error}</li>
      ));
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <section className="form-container">
        <ul className="errors">
          {this.renderErrors()}
        </ul>

        <form className="sign-form" onSubmit={this.handleSubmit}>
          <label className="label-form"
              htmlFor="email">
            Email address
          </label>
          <input
            className="input-form"
            type="text"
            onChange={this.update("email")}
            placeholder="yourname@example.com"
            value={email} />

          <label className="label-form"
              htmlFor="password">
            Password
          </label>
          <input
            className="input-form"
            type="password"
            onChange={this.update("password")}
            placeholder="******"
            value={password} />

          <button className="toggle-sign-up-in"
              onClick={this.props.togglePage}>
            Or create an account on Minimum
          </button>

          <button className="sign-button">
            Sign me in to Minimum
          </button>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
