import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import AuthSets from "../session/auth_sets";
import customModalStyle from "./auth_modal_style";

import { openModal, closeModal } from "../../actions/modal_actions";

const AuthModal = ({ authIsOpen, openModal, closeModal }) => {
  return (
    <Modal className="login-modal"
      isOpen={ authIsOpen }
      onRequestClose={ closeModal }
      contentLabel="Modal"
      style={ customModalStyle }>
      <button className="close-button">X</button>
      <AuthSets closeModal={ closeModal }/>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return { authIsOpen: state.modal.authIsOpen };
};

const mapDispatchToProps = (dispatch) => {
  return ({
    openModal: () => dispatch(openModal("authIsOpen")),
    closeModal: () => dispatch(closeModal("authIsOpen"))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModal);
