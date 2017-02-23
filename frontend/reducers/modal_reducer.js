import React from "react";
import { merge } from "lodash";

import { SHOW_MODAL, HIDE_MODAL } from "../actions/modal_actions";

const _initialState = { authIsOpen: false, deleteIsOpen: false };

const modalReducer = (oldState = _initialState, action) => {
  // Keep state immutable
  Object.freeze(oldState);

  switch (action.type) {
    case SHOW_MODAL:
      return merge({}, oldState, {[action.modalType]: true} );
    case HIDE_MODAL:
      return merge({}, oldState, {[action.modalType]: false} );
    default:
      return oldState;
  }
};

export default modalReducer;
