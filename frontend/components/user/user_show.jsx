import React, { Component } from "react";
import { connect } from "react-redux";
import { values } from "lodash";
import { fetchUser } from "../../actions/user_actions";
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
    this.props.fetchUserStories(this.props.params.username);
  }

  componentWillReceiveProps(newProps) {
    window.scrollTo(0, 0);
    if (newProps.params.username !== this.props.params.username) {
      newProps.fetchUser(newProps.params.username);
      newProps.fetchUserStories(newProps.params.username);
    }
  }

  toggleForm() {
    const toggleForm = this.state.toggleForm ? false : true;
    this.setState({ toggleForm });
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

    const topSide = this.state.toggleForm ?
                    <UserShowEditForm user={ user }
                                      currentUser={ currentUser }
                                      toggleForm= { this.toggleForm }/>:
                    <UserShowDetail user={ user } currentUser={ currentUser }
                      toggleForm= { this.toggleForm }/>;

    if (user) {
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
