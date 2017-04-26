import * as searchApiUtil from "../util/search_api_util";

import { receiveStories } from "./story_actions";
import { receiveUsers } from "./user_actions";

export const RECEIVE_ITEMS = "RECEIVE_ITEMS";

export const fetchSearchedItems = (searchTerm) => (dispatch) => {
  return searchApiUtil.fetchSearchedItems(searchTerm).then(
    (items) => {
      dispatch(receiveStories(items.stories));
      dispatch(receiveUsers(items.users));
    }
  );
};
