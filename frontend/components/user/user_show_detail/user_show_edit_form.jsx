import React, { Component } from "react";

class UserShowEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.user.name,
      description: this.props.user.description,
      avatar_url: this.props.avatar_url
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.toggleForm();
  }

  render() {
    const { toggleForm } = this.props;
    return (
      <form>
        <div className="submit-buttons">
          <button type="button" onClick={ this.handleSubmit }>Save</button>
          <button type="button" onClick={ toggleForm }>Cancel</button>
        </div>
      </form>
    );
  }
}

// const TopSideUserShowDetail = ({ user, currentUser }) => {
//   return (
//     <section className="top-side">
//       <div className="profile">
//         <div className="left-side">
//           <h3 className="left-side-name">
//             { user.name }
//           </h3>
//           <p className="left-side-description">
//             Hello! Welcome to { user.name } page.
//           </p>
//         </div>
//         <div className="right-side">
//           <img src={ user.avatar_url } className="profile-avatar"/>
//         </div>
//       </div>
//       <div className="mini-nav">
//         <ul>
//           <li>
//           </li>
//         </ul>
//       </div>
//     </section>
//   );
// };
//
// export default TopSideUserShowDetail;

export default UserShowEditForm;
