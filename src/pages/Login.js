import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

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

  handleClick = async e => {
    e.preventDefault();
    const self = this;
    await axios
      .post("http://0.0.0.0:5000/api/users/login", {
        username: self.state.username,
        password: self.state.password
      })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user_id);
        self.props.history.push("/calendar");
      });
  };

  handleRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <div class="container login mobileView">
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
                <button className="btn m-0" onClick={this.handleClick}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
