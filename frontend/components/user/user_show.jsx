import React, { Component } from "react";
import { connect } from "react-redux";
import { values } from "lodash";
import { fetchUser } from "../../actions/user_actions";
import UserStoryIndexItem from "./user_story_index_item";

class UserShow extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.params.username);
  }

  render() {
    const { user, currentUser } = this.props;
    const userStoryList = values(user.stories)
      .filter( (story) => (
      story.published && !story.parent_id))
      .map( (story) => (
      <UserStoryIndexItem key={ story.id } user={ user }
        story={ story } currentUser={ currentUser }/>
    ));

    if (user) {
      return (
        <main className="user-profile-container">
          <section className="top-side">
            <div className="profile">
              <div className="left-side">
                <h3 className="left-side-name">
                  { user.name }
                </h3>
                <p className="left-side-description">
                  Add Descriptions later...
                </p>
              </div>
              <div className="right-side">
                <img src={ user.avatar_url } className="profile-avatar"/>
              </div>
            </div>
            <div className="mini-nav">
              <ul>
                <li>
                </li>
              </ul>
            </div>
          </section>
          <section className="bottom-side">
            <div>Latest</div>
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
