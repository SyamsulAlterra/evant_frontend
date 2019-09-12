import React from "react";

class FormChangePassword extends React.Component {
  handleClick = () => {
    this.props.handleClick();
  };

  render() {
    return (
      <div className="formChangePassword border p-3 bg-info">
        <form className="text-center">
          <input type="text" className="m-2" placeholder="Old Password"></input>
          <p className="m-0">
            Please kindly check your new password before proceed
          </p>
          <input type="text" className="m-2" placeholder="address"></input>
          <input type="text" className="m-2" placeholder="phone"></input>
        </form>
      </div>
    );
  }
}

export default FormChangePassword;
