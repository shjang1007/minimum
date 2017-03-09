import React, { Component } from "react";
import { Link } from "react-router";

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

  // componentDidMount() {
  //   if (this.props.params.storyId) {
  //     this.props.fetchStory(this.props.params.storyId).then(
  //       (action) => {
  //         this.setState(action.story);
  //         this.setState({image_preview_url: action.story.image_url});
  //       }
  //     );
  //   }
  // }

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
      id: this.props.storyId,
      published: true,
      published_at: `${monthNames[date.getMonth()]} ${date.getDate()}`,
      tag_names: []
    };

    Object.keys(this.state).forEach( (tag) => {
      if (this.state.tag) {
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
        this.setState({[tag]: false});
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

export default PublishDropDownForm;

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
