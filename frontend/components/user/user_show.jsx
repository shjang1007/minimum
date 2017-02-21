import React, { Component } from "react";
import { connect } from "react-redux";

class UserShow extends Component {
  render() {
    return (
      <main>
        Welcome to the user show page!
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  // probably need to pass down published and non-published stories

};

const mapDispatchToProps = (dispatch) => {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);
