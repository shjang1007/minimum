import React, { Component } from "react";
import { connect } from "react-redux";
import { merge, values } from "lodash";
import { selectPublishedComments } from "../../reducers/selectors";
import CommentIndexItem from "./comment_index_item";

// Comments are just another stories. Should I make another comment action reducers ... just for the sake of clarity?

const CommentIndex = ({ comments }) => {

  if (comments) {
    const commentList = values(comments).map( (comment) => (
      <CommentIndexItem key={comment.id} comment={ comment } />
    ));

    return (
      <ul className="story-index">
        {commentList}
      </ul>
    );
  } else {
    return(<div className="loading"></div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return { comments: selectPublishedComments(ownProps) };
};


export default connect(
  mapStateToProps,
  null
)(CommentIndex);
