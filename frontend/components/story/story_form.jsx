import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { createStory, updateStory, fetchStory, updateStoryImage }
  from "../../actions/story_actions";
import * as StoryApiUtil from "../../util/story_api_util";

class StoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.story;

    this.update = this.update.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  componentDidMount() {
    if (this.props.params.storyId) {
      this.props.fetchStory(this.props.params.storyId).then(
        (story) => {
          this.setState(story);
          this.setState({image_preview_url: story.image_url});

        }
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.storyId !== newProps.params.storyId) {
      this.setState(newProps.story);
    }
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

  updateFile(e) {
    let fileReader = new FileReader();
    let file = e.currentTarget.files[0];
    fileReader.onloadend = () => {
      this.setState({ image_file: file, image_preview_url: fileReader.result });
    };

    if (file) {
      fileReader.readAsDataURL(file);
      let formData = new FormData();
      formData.id = this.state.id;
      formData.append("story[image]", file);
      this.props.updateStoryImage(formData);
    }
  }

  render() {
    if (this.props.story) {
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
            <input type="file"
              onChange={this.updateFile}/>
            <img src={ this.state.image_preview_url }/>
            <input onChange={this.update("title")}
              type="text"
              placeholder="Title"
              value={ title } />
            <input onChange={this.update("sub_title")}
              type="text"
              placeholder="Subtitle"
              value={ sub_title } />
            <textarea onChange={this.update("content")}
              placeholder="Tell your story..."
              value={ content }/>
          </form>
        </main>);
    } else {
      return(<div className="loading"></div>);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let story = {
    title: "",
    sub_title: "",
    content: "",
    image_file: null,
    image_preview_url: null,
    author_id: state.session.currentUser.id
  };

  const currentUser = state.session.currentUser;
  const formType = ownProps.location.pathname === "/new-story" ?
    "new" : "edit";

  let status = "Draft";

  if (state.stories[ownProps.params.storyId]) {
    story = state.stories[ownProps.params.storyId];
    if (story.published) {
      status = story.published_at;
    }
  }

  return { story, currentUser, formType, status };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm = ownProps.location.pathname === "/new-story" ?
    createStory : updateStory;

  return ({
    processForm: (story) => (dispatch(processForm(story))),
    updateStoryImage: (formData) => (dispatch(updateStoryImage(formData))),
    fetchStory: (id) => (dispatch(fetchStory(id)))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryForm));
