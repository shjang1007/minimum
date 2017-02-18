import React from "react";
import AuthSets from "../session/auth_sets";
import StoryIndex from "../story/story_index";

const Home = (props)=> {
  return (
    <main className="site-main surface-container">
      <section className="home-container">
        <section className="home-content">
          <div className="home-stories">
            <StoryIndex />
          </div>

          <div className="sidebar">
            <ul>
              <li>Top Stories</li>
              <li>My Stories</li>
              <li>Super Stories</li>
              <li>Babyshark Stories</li>
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Home;

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.session.currentUser
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     signOut: () => dispatch(signOut())
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);
