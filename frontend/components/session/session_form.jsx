import React, { Component } from "react";
import { Link, withRouter } from "react-router";

class SessionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return (e) => {
      return this.setState({[property]: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then( () => this.props.router.push("/"));
  }

  errors() {
    if (this.props.errors) {
      return (
        this.props.errors.map( error => {
          return (<li className="error" key={error}>{error}</li>);
        })
      );
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <section className="form-container">

        <ul>
          {this.errors()}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.update("username")}
            placeholder="example@email.com"
            value={username} />

          <input
            onChange={this.update("password")}
            placeholder="******"
            value={password} />

          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

export default withRouter(SessionForm);
