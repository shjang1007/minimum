import React from "react";
import { connect } from "react-redux";
import { merge, values } from "lodash";
import { selectPublishedComments } from "../../reducers/selectors";
import CommentIndexItem from "./comment_index_item";

const CommentIndex = ({ comments, openAuthModal, currentUser}) => {
  if (comments) {
    const commentList = comments.map( (comment) => (
      <CommentIndexItem key={comment.id}
        comment={ comment }
        openAuthModal={ openAuthModal }
        currentUser={ currentUser } />
    ));

    return (
      <ul className="comment-list-container">
        {commentList}
      </ul>

    );
  } else {
    return(<div className="loading"></div>);
  }
};


export default CommentIndex;
