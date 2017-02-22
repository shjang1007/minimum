import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { createStory, updateStory, fetchStory, updateStoryImage }
  from "../../actions/story_actions";

class StoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.story;
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
          processForm(this.state).then( (action) => {
            router.push(`/${action.story.id}/edit-story`);
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
                className="story-form-avatar avatar" />
            </Link>
            <div className="name-and-status">
              <Link to={`/@${currentUser.username}`}>
                {currentUser.name}
              </Link>
              <div>
                { status }
              </div>
            </div>
          </header>

          <form className="story-content">
            <div className="image-upload">
              <label htmlFor="file-input">
                <i className="fa fa-camera" aria-hidden="true"></i>
              </label>
              <input type="file"
                id="file-input"
                onChange={this.updateFile}/>
            </div>
            <input onChange={this.update("title")}
              type="text"
              className="form-title"
              placeholder="Title"
              value={ title } />
            <input onChange={this.update("sub_title")}
              type="text"
              className="form-subtitle"
              placeholder="Subtitle"
              value={ sub_title } />
            <img src={ this.state.image_preview_url }/>
            <textarea onChange={this.update("content")}
              placeholder="Tell your story..."
              className="form-content"
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
