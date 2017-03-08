import React, { Component } from "react";
import { Link } from "react-router";

class PublishDropDownForm extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      id: this.props.storyId,
      tag_names: []
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
      published: true,
      published_at: `${monthNames[date.getMonth()]} ${date.getDate()}`
    };

    const story = Object.assign({}, this.state, story);

    return this.props.publishStory(story).then(
      this.props.router.push(`/stories/${story.id}`)
    );
  }

  toggleDropDown(e) {
    e.currentTarget.classList.toggle("show");
  }

  render() {
    return (
      <div onClick={ this.toggleDropDown } className="drop-down-container">
        <button className="nav-bar-button green-button">
          Publish
        </button>

        <ul className="drop-down-container">
          <li>
            <div className="drop-down">
              <h3>
                Ready to publish{"?"}
              </h3>
              <p>
                Choose tags so your story reaches more people:
              </p>
            </div>
          </li>
          <li className="popover-arrow"></li>
        </ul>
      </div>
    );
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
