export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

export const openModal = (modalType) => {
  return {
    type: SHOW_MODAL,
    modalType
  };
};
export const closeModal = (modalType) => {
  return {
    type: HIDE_MODAL,
    modalType
  };
};
