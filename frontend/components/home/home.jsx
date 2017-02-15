import React from "react";
import { Link } from "react-router";

const Home = ({ currentUser, signout}) => {
    return (
      <header className="main-nav">
        <nav className="left-nav">
          <Link to="/"><i className="fa fa-medium" aria-hidden="true"></i> Medium</Link>
        </nav>

        <nav className="right-nav">
          <ul>
            <li><button className=" button gray-button">Write a story</button></li>
            <li><Link to="/signup" className="button green-button">Sign up</Link></li>
            <li><Link to="/signin" className="button green-button">Sign in</Link></li>
            <li>
              <button className="button gray-button">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </li>
          </ul>

        </nav>
      </header>
    )
};

export default Home;
