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

  toggleDropDown(e) {
    e.target.classList.toggle("show");
  }

  toggleTag(tag) {
    return (e) => {
      e.preventDefault();
      if (this.state[tag]) {
        this.setState({[tag]: false});
      } else {
        this.setState({[tag]: true});
      }
      e.currentTarget.classList.toggle("selected");
    };
  }

  render() {
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
                <li>
                  <button className="tag-button"
                    onClick={ this.toggleTag("nba") }>
                    NBA
                  </button>
                </li>
                <li>
                  <button className="tag-button"
                    onClick={ this.toggleTag("lol") }>
                    League of Legends
                  </button>
                </li>
                <li>
                  <button className="tag-button"
                    onClick={ this.toggleTag("food") }>
                    Food
                  </button>
                </li>
                <li>
                  <button className="tag-button"
                    onClick={ this.toggleTag("travel") }>
                    Travel
                  </button>
                </li>
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
