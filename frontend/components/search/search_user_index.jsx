import React, { Component } from "react";
import { connect } from "react-redux";
import { values } from "lodash";
import { openModal } from "../../actions/modal_actions";
import UserIndexItem from "./user_index_item";
import AuthModal from "../modal/auth_modal";

const SearchUserIndex = ({ users, currentUser, openAuthModal }) => {
  if (users) {
    const userList = values(users).map( (user) => (
      <UserIndexItem key={user.id}
          user={ user }
          currentUser={ currentUser }
          openAuthModal={ openAuthModal }/>
    ));
    return (
      <section>
        <ul className="user-index">
          {userList}
        </ul>
        <AuthModal/>
      </section>
    );
  } else {
    return(<div className="loading"></div>);
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openAuthModal: () => (dispatch(openModal("authIsOpen")))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchUserIndex);
