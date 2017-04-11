import React, { Component } from "react";

class UserShowEditForm extends Component {
  constructor(props) {
    super(props);

    const description = props.user.description ? props.user.description : "";

    this.state = {
      name: props.user.name,
      description,
      imageFile: null,
      imageUrl: props.user.avatar_url
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.update = this.update.bind(this);

  }

  updateFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      return this.setState({ imageFile: file, imageUrl: fileReader.result});
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  update(field) {
    return (e) => {
      return this.setState({[field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.username = this.props.user.username;
    formData.append("user[name]", this.state.name);
    formData.append("user[description]", this.state.description);
    formData.append("user[avatar]", this.state.imageFile);

    this.props.updateUserInfo(formData).then( () => {
      this.props.toggleForm();
    });
  }

  render() {
    const { toggleForm } = this.props;
    const { name, description } = this.state;

    return (
      <form className="top-side">
        <div className="profile">
          <div className="left-side">
            <h3 className="left-side-name">
              <input onChange={this.update("name")}
                type="text" value={ name }/>
            </h3>
            <input onChange={this.update("description")}
              className="left-side-description"
              type="text" value={ description }/>
            <div className="submit-buttons">
              <button type="submit" onClick={ this.handleSubmit }>Save</button>
              <button type="button" onClick={ toggleForm }>Cancel</button>
            </div>
          </div>
          <div className="right-side">
            <div className="image-upload">
              <label htmlFor="file-input">
                <img src={this.state.imageUrl} className="profile-avatar"/>
              </label>
              <input type="file"
                id="file-input"
                onChange={this.updateFile}/>
            </div>
          </div>
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
