import React, { Component } from "react";
import { Link } from "react-router";

import SessionFormContainer from "../session/session_form_container";

export default class Home extends Component {
  toggleModalActive(e) {
    e.preventDefault();
    let modal = document.getElementById("sign-modal");
    modal.addClass("is-active");
  }

  render() {
    return (
      <main>
        <header className="main-bar">
          <div className="inner-bar">
            <nav className="left-nav">
              <Link to="/" className="logo-link">
                <img src="/assets/konoha-logo.png" className="logo" />
                <span>Medium</span>

              </Link>
            </nav>

            <nav className="right-nav">
              <ul>
                <li>
                  <button className=" button gray-button">Write a story</button>
                </li>
                <li>
                  <Link to="/signup" className="button green-button">Sign up</Link>
                </li>
                <li>
                  <Link to="/signin" className="button green-button">Sign in</Link>
                </li>
                <li>
                  <button className="button gray-button">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="inner-bar">
            <ul>
              <li>Home</li>
              <li>Top stories</li>
              <li>Editors'' picks</li>
            </ul>
          </div>
        </header>

        <section className="main-body">
          <ul>
            <li>
              <p>AHHHHHHH</p>
            </li>
          </ul>
        </section>
      </main>

    );
  }
}
