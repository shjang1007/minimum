import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { fetchStory, updateStory } from "../../actions/story_actions";
import * as tagApiUtil from "../../util/tag_api_util";

class PublishDropDownForm extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      nba: false,
      travel: false,
      food: false,
      lol: false
    });

    this.handlePublish = this.handlePublish.bind(this);
  }

  componentDidMount() {
    const { pathname } = this.props.location;

    if (pathname.includes("/edit-story")) {
      this.props.fetchStory(this.props.params.storyId).then(
        (action) => {
          action.story.tags.forEach( (tag) =>{
            this.setState({[tag.name]: true});
          });
        }
      );
    }
  }

  // This function will only be called when there is a draft saved in the database
  // So this function will update story with publish date and tags
  handlePublish(e) {
    e.preventDefault();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"
    ];
    const date = new Date();

    const story = {
      id: this.props.params.storyId,
      published: true,
      published_at: `${monthNames[date.getMonth()]} ${date.getDate()}`,
    };

    this.props.togglePublishDropDown();
    return this.props.publishStory(story).then(
      this.props.router.push(`/stories/${story.id}`)
    );
  }

  toggleTag(tag) {
    return (e) => {
      e.preventDefault();
      if (this.state[tag]) {
        tagApiUtil.deleteTagging(this.props.params.storyId, tag).then(
          this.setState({[tag]: false})
        );
      } else {
        tagApiUtil.createTagging(this.props.params.storyId, tag).then(
          this.setState({[tag]: true})
        );
      }
      e.currentTarget.classList.toggle("selected");
    };
  }

  render() {
    if (this.props.publishDropDownOpen) {
      const { pathname } = this.props.location;
      if (pathname.includes("/edit-story")) {
        const tags = Object.keys(this.state);
        const tagList = tags.map( (tag) => {
          if (this.state[tag]) {
            return (
            <li key={ tag }>
              <button className="tag-button selected"
                onClick={ this.toggleTag(tag) }>
                { tag }
                <div>x</div>
              </button>
            </li>);
          } else {
            return (
            <li key={ tag }>
              <button className="tag-button"
                onClick={ this.toggleTag(tag) }>
                { tag }
              </button>
            </li>);
          }
        });
        return (
          <ul className="drop-down-container">
            <li className="drop-down tags-drop-down">
              <div className="drop-down-contents">
                <h4>
                  Ready to publish{"?"}
                </h4>
                <p>
                  Choose tags so your story reaches more people:
                </p>
                <ul className="tag-list">
                  { tagList }
                </ul>
                <button className="publish-button"
                        onClick={ this.handlePublish }>
                  Publish
                </button>
              </div>
            </li>
            <li className="popover-arrow"></li>
          </ul>
        );
      } else {
        return (
          <ul className="drop-down-container">
            <li className="drop-down black-background">
              <div>
                <p>Publishing will become available after you start writing</p>
              </div>
            </li>
            <li className="popover-arrow black-background"></li>
          </ul>
        );
      }
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    publishStory: (story) => (dispatch(updateStory(story))),
    fetchStory: (id) => (dispatch(fetchStory(id)))
  });
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(PublishDropDownForm));
