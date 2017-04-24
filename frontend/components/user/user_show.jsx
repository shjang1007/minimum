import React, { Component } from "react";
import { connect } from "react-redux";
import { values } from "lodash";
import { fetchUser, updateUserInfo } from "../../actions/user_actions";
import { fetchUserStories } from "../../actions/story_actions";
import { openModal } from "../../actions/modal_actions";
import { selectPublishedUserStories } from "../../reducers/selectors";
import UserStoryIndexItem from "./user_story_index_item";
import UserShowDetail from "./user_show_detail/user_show_detail";
import UserShowEditForm from "./user_show_detail/user_show_edit_form";
import AuthModal from "../modal/auth_modal";

class UserShow extends Component {
  constructor(props) {
    super(props);

    this.state = { toggleForm: false };

    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchUser(this.props.params.username);
  }

  componentWillReceiveProps(newProps) {
    window.scrollTo(0, 0);
    if (newProps.params.username !== this.props.params.username) {
      newProps.fetchUser(newProps.params.username);
    }
  }

  toggleForm() {
    const toggleForm = this.state.toggleForm ? false : true;
    this.setState({ toggleForm });
  }

  render() {
    const { user, currentUser } = this.props;

    if (user) {
      const userStoryList = user.stories
      .map( (story) => (
        <UserStoryIndexItem key={ story.id } user={ user }
          story={ story }
          currentUser={ currentUser }
          openAuthModal={ this.props.openAuthModal }/>
      ));

      const topSide = this.state.toggleForm ?
      <UserShowEditForm user={ user }
        currentUser={ currentUser }
        toggleForm={ this.toggleForm }
        updateUserInfo={ this.props.updateUserInfo }/>:
        <UserShowDetail user={ user } currentUser={ currentUser }
          toggleForm={ this.toggleForm }/>;
      return (
        <main className="user-profile-container">
          { topSide }
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
  const user = state.userData.user;
  const currentUser = state.session.currentUser;
  return ({ user, currentUser });
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (username) => (dispatch(fetchUser(username))),
    updateUserInfo: (formData) => (dispatch(updateUserInfo(formData))),
    openAuthModal: () => (dispatch(openModal("authIsOpen")))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);
