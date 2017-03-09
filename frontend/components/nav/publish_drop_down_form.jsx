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
      lol: false,
      food: false,
      travel: false
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
      tag_names: []
    };

    Object.keys(this.state).forEach( (tag) => {
      if (this.state[tag]) {
        story["tag_names"].push(tag);
      }
    });

    return this.props.publishStory(story).then(
      this.props.router.push(`/stories/${story.id}`)
    );
  }

  toggleTag(tag) {
    return (e) => {
      if (this.state.tag) {
        tagApiUtil.deleteTagging(this.props.params.storyId, tag).then(
          this.setState({[tag]: false})
        );
      } else {
        this.setState({[tag]: true});
      }
      e.currentTarget.classList.toggle("selected");
    };
  }

  render() {
    const { state } = this;
    const tags = Object.keys(this.state);
    const tagList = tags.map( (tag) => {
      if (state[tag]) {
        return (<li key={ tag }>
          <button className="tag-button selected"
            onClick={ this.toggleTag(tag) }>
            { tag }
          </button>
        </li>);
      } else {
        return (<li key={ tag }>
          <button className="tag-button"
            onClick={ this.toggleTag(tag) }>
            { tag }
          </button>
        </li>);
      }
    });

    if (this.props.publishDropDownOpen) {
      return (
        <ul className="drop-down-container">
          <li>
            <div className="drop-down">
              <h4>
                Ready to publish{"?"}
              </h4>
              <p>
                Choose tags so your story reaches more people:
              </p>
              <ul className="tag-list">
                { tagList }
              </ul>
              <button onClick={ this.handlePublish }>Publish</button>
            </div>
          </li>
          <li className="popover-arrow"></li>
        </ul>
      );
    } else {
      return null;
    }
  }
}

// const mapStateToProps = (state, ownProps) => {
//   debugger
//   if (ownProps.location.pathname.includes("/edit-story")) {
//     return { story: state.stories[ownProps.params.storyId]};
//   }
// };

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

// After p tag
// <li>
//   <Link to="/new-story">
//     New Story
//   </Link>
// </li>
// <li>
//   <Link to="/me/stories/drafts">
//     Stories
//   </Link>
// </li>
// <li className="separator"></li>
