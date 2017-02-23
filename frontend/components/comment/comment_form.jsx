import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { Link, withRouter } from "react-router";
import { createStory, updateComment }
  from "../../actions/story_actions";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      content: "",
      parent_id: props.params.storyId,
      author_id: null,
      update: false,
      showCommentForm: false
    });

    this.handlePublish = this.handlePublish.bind(this);
    this.toggleShowCommentForm = this.toggleShowCommentForm.bind(this);
    this.handleFullScreen = this.handleFullScreen.bind(this);
  }

  update(field) {
    const { content, parent_id, author_id, update, id } = this.state;
    const { updateComment, createStory } = this.props;

    return (e) => {
      this.setState({[field]: e.target.value}, () => {
        if (update) {
          const comment = ({ content, parent_id, author_id,
            id
          });
          updateComment(comment);
        } else {
          this.setState({ update: true });
          const comment = ({ content, parent_id, author_id: props.currentUser.id });
          createStory(comment).then(action => {
            this.setState({id: action.story.id});
          });
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
    if (isEmpty(this.props.currentUser)) {

    } else {
      this.setState({showCommentForm: true});
    }
  }

  handleFullScreen(e) {
    e.preventDefault();

    const { content, parent_id, author_id, update } = this.state;
    const { updateComment, createStory, router } = this.props;

    if (update) {
      const comment = ({ content, parent_id, author_id,
        id: this.state.id
      });
      updateComment(comment).then(
        action => {
          router.push(`/${action.story.id}/edit-story`);
      });
    } else {
      const comment = ({ content, parent_id, author_id });
      createStory(comment).then(action => {
        router.push(`/${action.story.id}/edit-story`);
      });
    }
  }

  render() {
    const { currentUser } = this.props;
    const { content, showCommentForm } = this.state;

    if (showCommentForm && !isEmpty(currentUser)) {
      return (
        <main className="index-item comment-form">
          <header className="index-item-profile comment-profile">
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
          </header>

          <form className="index-item-content">
            <textarea onChange={this.update("content")}
                className="form-content"
                value={ content }/>
            <div className="form-buttons">
              <button className="green-button button green-form-button"
                onClick={ this.handlePublish }>
                Publish
              </button>
              <button className="gray-button button"
                onClick={ this.handleFullScreen }>
                Go Full Screen
              </button>
            </div>
          </form>
        </main>
      );
    } else {
      if (!isEmpty(currentUser)) {
        return (
          <div className = "index-item pre-comment-form"
            onClick={ this.toggleShowCommentForm }>
            <img src={ currentUser.avatar_url }
              className="story-avatar avatar" />
            <div className="placeholder-comment">
              Write a response...
            </div>
          </div>
        );
      } else {
        return (<div>yes</div>);
      }
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

// Auto Size text area?
// let textarea = document.querySelector('textarea');
//
// textarea.addEventListener('keydown', autosize);
//
// const autosize = () => {
//   let el = this;
//   setTimeout(function(){
//     el.style.cssText = 'height:auto; padding:0';
//     // for box-sizing other than "content-box" use:
//     // el.style.cssText = '-moz-box-sizing:content-box';
//     el.style.cssText = 'height:' + el.scrollHeight + 'px';
//   },0);
// };
