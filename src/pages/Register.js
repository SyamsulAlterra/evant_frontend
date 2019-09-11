import React from "react";
import Button from "../components/Button";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleName = e => {
    let inputName = e.target.value;
    this.setState({ name: inputName });
  };

  handleUsername = e => {
    let inputUsername = e.target.value;
    this.setState({ username: inputUsername });
  };

  handleEmail = e => {
    let inputEmail = e.target.value;
    this.setState({ email: inputEmail });
  };

  handlePassword = e => {
    let inputPassword = e.target.value;
    this.setState({ password: inputPassword });
  };

  handleConfirmPassword = e => {
    let inputConfirmPassword = e.target.value;
    this.setState({ confirmPassword: inputConfirmPassword });
  };

  handleClick = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="container register">
        <div className="row justify-content-center">
          <div className="col text-center">
            <div className="mt-5">
              <h1 className="underline mb-0">Evant</h1>
              <p className="mt-0 p-0">Decide When, Where, Who</p>
              <form action="">
                <input
                  type="text"
                  className="m-2"
                  placeholder="Name"
                  onChange={this.handleName}
                />
                <input
                  type="text"
                  className="m-2"
                  placeholder="Username"
                  onChange={this.handleUsername}
                />
                <input
                  type="email"
                  className="m-2"
                  placeholder="Email"
                  onChange={this.handleEmail}
                />
                <input
                  type="password"
                  className="m-2"
                  placeholder="Password"
                  onChange={this.handlePassword}
                />
                <input
                  type="password"
                  className="m-2"
                  placeholder="Confirm password"
                  onChange={this.handleConfirmPassword}
                />
              </form>
              <Button
                className="mt-3"
                buttonName="Register"
                handleClick={this.handleClick}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
