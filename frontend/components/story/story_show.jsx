import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { fetchStory } from "../../actions/story_actions";
import CommentIndex from "../comment/comment_index";

class StoryShow extends Component {
  componentDidMount() {
    this.props.fetchStory(this.props.params.storyId);
  }

  renderImage() {
    const { story } = this.props;
    if (story.image_url) {
      return (<img src={story.image_url} className="story-show-image" />);
    } else {
      return (<div className="no-picture-tag"></div>);
    }
  }

  render() {
    const { story } = this.props;


    if (story) {
      const author = story.author;
      return (
        <main className="story-show-container">
          <section className="story-content-container">
            <header className="story-show-header">
              <div>
                <Link to={`/@${author.username}`}>
                  <img src={ author.avatar_url }
                    className="instory-avatar avatar" />
                </Link>
              </div>
              <div>
                <ul className="story-detail-info">
                  <li>
                    <Link to={`/@${author.username}`}>
                      {author.name}
                    </Link>
                  </li>
                  <li className="description">
                    description of {author.name}
                  </li>
                  <li className="description">
                    {story.published_at}
                  </li>
                </ul>
              </div>
            </header>
            <section className="story-show-details">
              <h1 className="story-show-title">
                { story.title }
              </h1>
              <h3 className="story-show-subtitle">
                { story.sub_title }
              </h3>
              { this.renderImage() }
              <p className="story-show-content">
                { story.content }
              </p>
            </section>
            <footer className="story-show-footer">
                <div>
                  <Link to={`/@${author.username}`}>
                    <img src={ author.avatar_url }
                      className="instory-avatar avatar" />
                  </Link>
                </div>
                <div>
                  <ul className="story-detail-info">
                    <li className="footer-author">
                      <Link to={`/@${author.username}`}>
                        {author.name}
                      </Link>
                    </li>
                    <li className="description footer-description">
                      description of {author.name}
                    </li>
                  </ul>
                </div>
            </footer>
          </section>
          <section className="response-container">
            <div className="response-contents">
              <CommentIndex comments={ story.comments }/>
            </div>
          </section>
        </main>
      );
    } else {
      return (<div className="loading"></div>);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    story: state.stories[ownProps.params.storyId]
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchStory: (id) => (dispatch(fetchStory(id)))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryShow);
