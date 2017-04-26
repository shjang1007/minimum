import React from "react";
import { Link } from "react-router";

const MyDrafts = ({ drafts, handleNavigate }) => {
  const draftList = drafts.map( (draft) => {
    const link = `/${draft.id}/edit-story`;

    if (!draft.title) {
      return (
        <li key={draft.id} className="story-li">
          <button onClick={ handleNavigate("edit", draft.id) }>
            <div>Untitled story</div>
          </button>
        </li>
      );
    } else {
      return (
        <li key={ draft.id } className="story-li">
          <button onClick={ handleNavigate("edit", draft.id) }>
            <div>{ draft.title }</div>
          </button>
        </li>
      );
    }
  });

  return (
    <ul className="story-index">
      {draftList}
    </ul>
  );
};

export default MyDrafts;
