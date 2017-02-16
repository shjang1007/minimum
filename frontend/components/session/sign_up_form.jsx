import React, { Component } from "react";
import { connect } from "react-redux";
import { merge } from "lodash";
import { signUp, receiveErrors } from "../../actions/session_actions";

// For now, just rending one form page to handle all info

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      page: "first",
      email: "",
      password: "",
      username: "",
      name: ""
    });

    this.goToNextPage = this.goToNextPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  goToNextPage(e) {
    e.preventDefault();
    this.setState({page: "second"});
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    delete user.page;

    this.props.signUp(user).then(() => this.props.closeModal());
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

  renderFirstPage() {
    const { email, password, username, name } = this.state;
    return (
      <section className="form-container">
        <ul className="errors">
          {this.renderErrors()}
        </ul>

        <form className="sign-form" onSubmit={this.handleSubmit}>
          <label className="label-form" htmlFor="email">Email address</label>
          <input
            className="input-form"
            type="text"
            onChange={this.update("email")}
            placeholder="yourname@example.com"
            value={email} />

          <label className="label-form" htmlFor="password">Password</label>
          <input
            className="input-form"
            type="password"
            onChange={this.update("password")}
            placeholder="******"
            value={password} />

          <label className="label-form" htmlFor="username">Username</label>
          <input
            className="input-form"
            type="username"
            onChange={this.update("username")}
            placeholder="Enter your username"
            value={username} />

          <label className="label-form" htmlFor="name">Name</label>
          <input
            className="input-form"
            type="name"
            onChange={this.update("name")}
            placeholder="Enter your name please"
            value={name} />

          <button className="toggle-sign-up-in"
              onClick={this.props.togglePage}>
            Or sign in to Minimum using E-mail
          </button>

          <button className="sign-button">
            Create a new account to join Minimum
          </button>
        </form>
      </section>
    );
  }

  renderSecondPage() {
    const { username, name } = this.state;
    return (
      <section className="form-container">
        <ul>
          {this.renderErrors()}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            onChange={this.update("username")}
            placeholder="Enter your username"
            value={username} />

          <label htmlFor="name">Name</label>
          <input
            type="name"
            onChange={this.update("name")}
            placeholder="Enter your name please"
            value={name} />


          <button>Sign up</button>
        </form>
      </section>
    );
  }

  render() {
    const { signUp, errors } = this.props;
    switch (this.state.page) {
      case "first":
        return this.renderFirstPage();
      case "second":
        return this.renderSecondPage();
      default:
        return this.renderFirstPage();
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
