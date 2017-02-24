import React, { Component } from "react";
import { connect } from "react-redux";
import { values } from "lodash";
import { fetchUser } from "../../actions/user_actions";

class UserShow extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.params.username);
  }

  render() {
    const { user, currentUser } = this.props;
    const userStoryList = values(user.stories).map( (story) => (
      <li key={ story.id }>
        <div>{ story.title }</div>
      </li>
    ));

    if (user) {
      return (
        <main className="user-profile-container">
          <section className="top-side">
            <div className="profile">
              <div className="left-side">
                <h3>{ user.name }</h3>
                <p>Add Descriptions later...</p>
              </div>
              <div className="right-side">
                <img src={ user.avatar_url } className="profile-avatar"/>
              </div>
            </div>
            <div className="mini-nav">
              <ul>
                <li>Stories</li>
                <li>Responses</li>
              </ul>
            </div>
          </section>
          <section className="bottom-side">
            <ul>
              { userStoryList }
            </ul>
          </section>
        </main>
      );
    } else {
      return (<div className="loading"></div>);
    }
  }
}

const mapStateToProps = (state) => {
  // probably need to pass down published and non-published stories
  const user = state.user;
  const currentUser = state.session.currentUser;

  return ({ user, currentUser });
};

const mapDispatchToProps = (dispatch) => {
  return { fetchUser: (username) => (dispatch(fetchUser(username)))};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);
