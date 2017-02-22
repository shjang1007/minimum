import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { createStory, updateStory, fetchStory }
  from "../../actions/story_actions";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      content: "",
      parent_id: props.params.storyId,
      author_id: props.currentUser.id,
      update: false,

    });

    this.handlePublish = this.handlePublish.bind(this);
  }

  update(field) {
    const { content, parent_id, author_id, update } = this.state;
    const { updateStory, createStory } = this.props;

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
          updateStory(comment);
        }
      });
    };
  }

  handlePublish() {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"
    ];
    const date = new Date();

    const story = {
      id: this.state.id,
      published: true,
      published_at: `${monthNames[date.getMonth()]} ${date.getDate()}`
    };

    this.props.updateStory(story).then(
      this.setState({
        id: null,
        content: "",
        parent_id: this.props.params.storyId,
        author_id: this.props.currentUser.id,
        update: false
      })
    );
  }

  handleFullScreen(e) {

  }

  render() {
    const { currentUser } = this.props;
    const { content } = this.state;
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
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    createStory: (story) => (dispatch(createStory(story))),
    updateStory: (story) => (dispatch(updateStory(story)))
  });
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CommentForm));
