import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import customModalStyle from "../nav/modal_style";
import { openModal, closeModal } from "../../actions/modal_actions";

const AuthModal = ({ deleteIsOpen, openModal, closeModal, deleteStory }) => {
  return (
    <Modal className="delete-modal"
      isOpen={ deleteIsOpen }
      onRequestClose={ closeModal }
      contentLabel="Modal"
      style={ customModalStyle }>

      <div className="delete-modal">
        <h3 className="delete-modal-title">
          Delete
        </h3>
        <div className="delete-modal-content">
          Deleted stories are gone forever. Are you sure?
        </div>
        <ul className="delete-modal-buttons">
          <button className="delete-modal-button"
            onClick={ deleteStory }>
            Delete
          </button>
          <button className="delete-modal-button"
              onClick={ closeModal }>
            Cancel
          </button>
        </ul>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    deleteIsOpen: state.modal.deleteIsOpen,
    deleteStory: ownProps.deleteStory
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
    openModal: () => dispatch(openModal("deleteIsOpen")),
    closeModal: () => dispatch(closeModal("deleteIsOpen"))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModal);
