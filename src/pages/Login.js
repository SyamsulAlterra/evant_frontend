import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import axios from "axios";
import Swal from "sweetalert2";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import GoogleButton from "react-google-button";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import homeLogo from "../images/e.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      display: false
    };
  }

  responseGoogle = async response => {
    console.log(response);
    const req = {
      method: "post",
      url: this.props.baseUrl + "users/google_login",
      headers: {},
      data: {
        email: response.profileObj.email,
        token_google: response.tokenId
      }
    };

    const self = this;
    await axios(req)
      .then(function(response) {
        console.log("login as", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user["user_id"]);
        localStorage.setItem("address", response.data.user["address"]);
        localStorage.setItem("email", response.data.user["email"]);
        localStorage.setItem("fullname", response.data.user["fullname"]);
        localStorage.setItem("gender", response.data.user["gender"]);
        localStorage.setItem("phone", response.data.user["phone"]);
        localStorage.setItem("username", response.data.user["username"]);
        self.props.history.push("/home");
      })
      .catch(function(error) {
        console.log("ERROR", error);
      });
  };

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
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000
    });
    if (this.state.username === "") {
      Swal.fire("Error", "Please fill in your Username", "warning");
      return false;
    }
    if (this.state.password === "") {
      Swal.fire("Error", "Please fill in your password", "warning");
      return false;
    }
    const self = this;
    await axios
      .post(this.props.baseUrl + "users/login", {
        username: self.state.username,
        password: self.state.password
      })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user["user_id"]);
        localStorage.setItem("address", response.data.user["address"]);
        localStorage.setItem("email", response.data.user["email"]);
        localStorage.setItem("fullname", response.data.user["fullname"]);
        localStorage.setItem("gender", response.data.user["gender"]);
        localStorage.setItem("phone", response.data.user["phone"]);
        localStorage.setItem("username", response.data.user["username"]);
        self.props.history.push("/home");
        Toast.fire({
          type: "success",
          title: "Welcome " + localStorage.getItem("fullname") + "!"
        });
      })
      .catch(error => {
        Swal.fire("Error", "Invalid username/password or not match", "error");
      });
  };

  componentDidMount = () => {
    this.setState({ display: true });
  };

  render() {
    return (
      <CSSTransition
        in={this.state.display}
        timeout={22000}
        classNames="display"
        unmountOnExit
        appear
      >
        <div class="container login mobileView align-items-center">
          <div class="row justify-content-center">
            <div class="col text-center">
              <h1 className="my-5 underline home-evant animated fadeIn">
                Evant
              </h1>
              <div className="home-logo my-3">
                <img
                  src={homeLogo}
                  alt=""
                  className="text-center mt-3 mb-5 animated bounceInDown delay-1s"
                  width="50%"
                  height="50%"
                />
              </div>
              <form className="mt-3 mb-0 animated fadeIn">
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
              <div className="row no-gutters justify-content-center animated fadeIn">
                <div className="col-auto">
                  <button
                    className="btn login-button my-2 text-center"
                    onClick={this.handleClick}
                  >
                    Login
                  </button>
                  <br />
                  <Link to="/register">
                    <small className="register-text">
                      Don't have an acoount? click here to create an account
                    </small>
                  </Link>
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-auto">
                  <GoogleLogin
                    clientId="47584810358-62nmr7avsvoep7lagucvlb9hnj39h8jj.apps.googleusercontent.com"
                    render={renderProps => (
                      <div
                        class="g-signin2"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        This is my custom Google button
                      </div>
                    )}
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                  <GoogleLogout
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.logOut}
                  ></GoogleLogout>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default connect("baseUrl")(withRouter(Login));
