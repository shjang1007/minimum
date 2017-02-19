import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { merge } from "lodash";
import { fetchStory, createStory, updateStory }
  from "../../actions/story_actions";

class StoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.story;

    this.update = this.update.bind(this);
  }

  // componentDidMount() {
  //   if (this.props.params) {
  //     this.props.fetchStory(this.props.params.storyId);
  //   }
  // }
  //
  componentWillReceiveProps(newProps) {
    this.setState(newProps.story);
  }

  update(field) {
    const { router, processForm, formType } = this.props;
    return (e) => {
      return this.setState({[field]: e.target.value}, () => {
        if (formType === "new") {
          processForm(this.state).then( (newStory) => {
            router.push(`/${newStory.id}/edit-story`);
          });
        } else {
          processForm(this.state);
        }
      });
    };
  }

  render() {
    const { currentUser, status } = this.props;
    const { title, sub_title, content } = this.state;
    return (
      <main className="story-main">
        <header className="story-header">
          <Link to={`/@${currentUser.username}`}>
            <img src={ currentUser.avatar_url }
                className="instory-avatar" />
          </Link>
          <Link to={`/@${currentUser.username}`}>
            {currentUser.name}
          </Link>
          <div>
            { status }
          </div>
        </header>

        <form className="story-content" onSubmit={this.handleSubmit}>
          <input onChange={this.update("title")}
              type="text"
              placeholder="Title"
              value={ title } />
            <input onChange={this.update("sub_title")}
              type="text"
              placeholder="Subtitle"
              value={sub_title } />
            <textarea onChange={this.update("content")}
                placeholder="Tell your story..."
                value={ content }/>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let story = {
    title: "",
    sub_title: "",
    content: "",
    author_id: state.session.currentUser.id
  };

  const currentUser = state.session.currentUser;
  const formType = ownProps.location.pathname === "/new-story" ?
    "new" : "edit";

  let status = "Draft";
  if (ownProps.params.storyId) {
    story = state.stories[ownProps.params.storyId];
    if (story.published) {
      status = "story.published_at";
    }
  }

  return { story, currentUser, formType, status };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm = ownProps.location.pathname === "/new-story" ?
    createStory : updateStory;

  return ({
    processForm: (story) => (dispatch(processForm(story))),
    fetchStory: (story) => (dispatch(processForm(story)))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryForm));
