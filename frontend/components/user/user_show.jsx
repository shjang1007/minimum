import React, { Component } from "react";
import { connect } from "react-redux";
import { values } from "lodash";
import { fetchUser } from "../../actions/user_actions";
import { fetchUserStories } from "../../actions/story_actions";
import { openModal } from "../../actions/modal_actions";
import { selectPublishedUserStories } from "../../reducers/selectors";
import UserStoryIndexItem from "./user_story_index_item";
import AuthModal from "../modal/auth_modal";

class UserShow extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.params.username);
    this.props.fetchUserStories(this.props.params.username);
  }

  render() {
    const { user, currentUser, userStories } = this.props;
    const userStoryList = userStories
      .map( (story) => (
      <UserStoryIndexItem key={ story.id } user={ user }
        story={ story }
        currentUser={ currentUser }
        openAuthModal={ this.props.openAuthModal }/>
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
                  Hello! Welcome to { user.name} page.
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
            <AuthModal />
          </section>
        </main>
      );
    } else {
      return (<div className="loading"></div>);
    }
  }
}

const mapStateToProps = (state) => {
  const user = state.user;
  const currentUser = state.session.currentUser;
  const userStories = selectPublishedUserStories(state.stories, state.user.id);
  return ({ user, currentUser, userStories });
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (username) => (dispatch(fetchUser(username))),
    fetchUserStories: (username) => (dispatch(fetchUserStories(username))),
    openAuthModal: () => (dispatch(openModal("authIsOpen")))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);
