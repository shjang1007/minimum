import React from "react";
import { Link } from "react-router";

const Home = ({ currentUser, signout}) => {
  if (!currentUser) {
    return (
      <header className="header-bar">
        <Link to="/signup">Sign up</Link>&nbsp;&nbsp;
        <Link to="/signin">Sign in</Link>
      </header>
    );
  }

  return(
    <header className="header-bar">
      <button onClick={signout}>Sign out</button>
    </header>
  );
};

export default Home;
