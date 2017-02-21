import React, { Component } from "react";
import { connect } from "react-redux";

class UserShow extends Component {
  render() {
    return (
      <main>
        <div>Why is this not working?</div>
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
