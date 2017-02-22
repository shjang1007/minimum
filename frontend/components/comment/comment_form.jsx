import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { createStory, updateComment, fetchStory }
  from "../../actions/story_actions";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      content: "",
      parent_id: props.params.storyId,
      author_id: props.currentUser.id,
      update: false,
      showCommentForm: false
    });

    this.handlePublish = this.handlePublish.bind(this);
    this.toggleShowCommentForm = this.toggleShowCommentForm.bind(this);
  }

  update(field) {
    const { content, parent_id, author_id, update } = this.state;
    const { updateComment, createStory } = this.props;

    return (e) => {
      this.setState({[field]: e.target.value}, () => {
        if (!update) {
          this.setState({ update: true});
          const comment = ({ content, parent_id, author_id });
          createStory(comment).then(action => {
            this.setState({id: action.story.id});
          });
        } else {
          const comment = ({ content, parent_id, author_id,
            id: this.state.id
          });
          updateComment(comment);
        }
      });
    };
  }

  handlePublish(e) {
    e.preventDefault();

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"
    ];
    const date = new Date();

    const comment = {
      id: this.state.id,
      published: true,
      published_at: `${monthNames[date.getMonth()]} ${date.getDate()}`
    };

    this.props.updateComment(comment).then(
      this.setState({
        id: null,
        content: "",
        parent_id: this.props.params.storyId,
        author_id: this.props.currentUser.id,
        update: false
      })
    );
  }

  toggleShowCommentForm() {
    this.setState({showCommentForm: true});
  }

  handleFullScreen(e) {

  }

  render() {
    const { currentUser } = this.props;
    const { content, showCommentForm } = this.state;

    if (showCommentForm) {
      return (
        <main className="index-item">
          <header className="index-item-profile">
            <ul className="index-item-author-info">
              <Link to={`/@${currentUser.username}`}>
                <img src={ currentUser.avatar_url }
                  className="story-avatar avatar" />
              </Link>
              <div className="author-date-container">
                <Link to={`/@${currentUser.username}`}
                    className="green-button">
                  {currentUser.name}
                </Link>
              </div>
            </ul>
          </header>

          <form className="index-item-content">
            <textarea onChange={this.update("content")}
              className="form-content"
              value={ content }/>

            <button onClick={ this.handlePublish }>Publish</button>
            <button>Go Full Screen</button>
          </form>
        </main>
      );
    } else {
      return (
        <main className="index-item">
          <button onClick={ this.toggleShowCommentForm }>
            <img src={ currentUser.avatar_url }
              className="story-avatar avatar" />
          </button>
        </main>
      );
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    createStory: (comment) => (dispatch(createStory(comment))),
    updateComment: (comment) => (dispatch(updateComment(comment)))
  });
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CommentForm));
