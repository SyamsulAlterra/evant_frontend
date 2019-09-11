import React from "react";
import Button from "../components/Button";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsername = e => {
    let inputUsername = e.target.value;
    this.setState({ username: inputUsername });
  };

  handlePassword = e => {
    let inputPassword = e.target.value;
    this.setState({ password: inputPassword });
  };

  handleClick = () => {
    console.log(this.state);
  };

  handleRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <div class="container login">
        <div class="row justify-content-center">
          <div class="col text-center">
            <h2 className="mt-2 mb-0 underline">Evant</h2>
            <p className="my-0">login</p>
            <form className="mt-2">
              <input
                type="text"
                placeholder="Username"
                className="m-2"
                onChange={this.handleUsername}
              />
              <input
                type="password"
                placeholder="Password"
                className="m-2"
                onChange={this.handlePassword}
              />
            </form>
            <div className="row no-gutters">
              <div className="col-7 text-right mx-2">
                <button
                  className="btn m-0 registerButton"
                  onClick={this.handleRegister}
                >
                  Register
                </button>
              </div>
              <div className="col-auto">
                <Button
                  buttonName="Login"
                  handleClick={this.handleClick}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
