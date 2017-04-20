import * as searchApiUtil from "../util/search_api_util";

export const RECEIVE_ITEMS = "RECEIVE_ITEMS";

export const fetchSearchedItems = (searchTerm) => (dispatch) => {
  return searchApiUtil.fetchSearchedItems(searchTerm).then(
    (items) => {
      return dispatch(receiveItems(items));
    }
  );
};

export const receiveItems = (items) => {
  return ({
    type: RECEIVE_ITEMS,
    items
  });
};
