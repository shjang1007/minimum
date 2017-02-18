import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { merge } from "lodash";
import { fetchStory, createStory, updateStory }
  from "../../actions/session_actions";

class StoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.story;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // Here I set published to true and published_at to date
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    const { currentUser } = this.props;
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
            Draft
          </div>
        </header>

        <form className="story-content">
          <input onChange={this.update("title")}
              placeholder="Title"
              value={this.state.title} />
            <input onChange={this.update("sub_title")}
              placeholder="Subtitle"
              value={this.state.sub_title} />
            <textarea onChange={this.update("content")}
                placeholder="Tell your story..."
                value={this.state.content}/>
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

  if (ownProps.params.storyId) {
    story = state.stories[ownProps.pramas.storyId];
  }

  return { story, currentUser };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let processForm = ownProps.location.pathname === "/new-story" ?
    createStory : updateStory;

  return ({
    processForm: (story) => (dispatch(processForm(story)))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryForm);
