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
      author_id: props.currentUser.id
    });

    this.update = this.update.bind(this);
  }

  // I can comeback to this, if I want to refresh and still manage to have my state
  // componentDidMount() {
  //   if (this.props.params.storyId) {
  //     this.props.fetchStory(this.props.params.storyId).then(
  //       (story) => {
  //         this.setState(story);
  //         this.setState({image_preview_url: story.image_url});
  //       }
  //     );
  //   }
  // }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.story);
  }

  update(field) {
    const { content } = this.state;

    let processForm = this.props.updateStory;
    if (content.length === 0) processForm = this.props.createStory;
    return (e) => {
      this.setState({[field]: e.target.value}, () => {
        processForm(this.state).then(action => {
          this.setState({id: action.story.id});
        });
      });
    };
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
              <Link to={`/@${currentUser.username}`}>
                {currentUser.name}
              </Link>
            </div>
          </ul>
        </header>

        <form className="index-item-content">
          <textarea onChange={this.update("content")}
            className="form-content"
            value={ content }/>

          <button>Publish</button>
          <button>Go Full Screen</button>
        </form>
      </main>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   let story = {
//     title: "",
//     sub_title: "",
//     content: "",
//     image_file: null,
//     image_preview_url: null,
//     parent_id: ownProps.params.storyId,
//     author_id: state.session.currentUser.id
//   };
//
//   const currentUser = state.session.currentUser;
//   const formType = ownProps.location.pathname === "/new-story" ?
//     "new" : "edit";
//
//   let status = "Draft";
//
//   if (state.stories[ownProps.params.storyId]) {
//     story = state.stories[ownProps.params.storyId];
//     if (story.published) {
//       status = story.published_at;
//     }
//   }
//
//   return { story, currentUser };
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    createStory: (story) => (dispatch(createStory(story))),
    updateStory: (story) => (dispatch(updateStory(story)))
  });
  // fetchStory: (id) => (dispatch(fetchStory(id)))
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CommentForm));
