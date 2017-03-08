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

  }

  handlePublish(e) {
    e.preventDefault();

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"
    ];
    const date = new Date();

    const publishInfo = {
      id: this.props.storyId,
      published: true,
      published_at: `${monthNames[date.getMonth()]} ${date.getDate()}`
    };

    const story = Object.assign({}, this.state, story);

    return this.props.publishStory(story).then(
      this.props.router.push(`/stories/${story.id}`)
    );
  }

  toggleTag(tag) {
    return (e) => {
      if (this.state[tag]) {
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
