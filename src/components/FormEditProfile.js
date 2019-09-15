import React from "react";

class FormEditProfile extends React.Component {
  handleClick = () => {
    this.props.handleClick();
  };

  render() {
    return (
      <div className="formEditProfile border p-3 bg-info">
        <form className="text-center">
          <p className="m-0">
            Please kindly check your new identity before proceed
          </p>
          <input type="text" className="m-2" placeholder="username"></input>
          <input type="text" className="m-2" placeholder="address"></input>
          <input type="text" className="m-2" placeholder="phone"></input>
        </form>
      </div>
    );
  }
}

export default FormEditProfile;
