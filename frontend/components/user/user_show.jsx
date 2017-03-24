import React, { Component } from "react";
import { connect } from "react-redux";
import { values } from "lodash";
import { fetchUser } from "../../actions/user_actions";
import { fetchUserStories } from "../../actions/story_actions";
import { openModal } from "../../actions/modal_actions";
import { selectPublishedUserStories } from "../../reducers/selectors";
import UserStoryIndexItem from "./user_story_index_item";
import TopSideUserShowDetail from
  "./user_show_detail/top_side_user_show_detail";
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
          <TopSideUserShowDetail user={ user } />
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
