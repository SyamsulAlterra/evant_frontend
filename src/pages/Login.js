import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import axios from "axios";
import Swal from "sweetalert2";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import GoogleButton from "react-google-button";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "bootstrap/dist/js/bootstrap.bundle";
import homeLogo from "../images/e.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      display: false,
      formData: {
        username: "",
        password: ""
      },
      submitted: false
    };
  }

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  };

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
              <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                <TextValidator
                  label="Username"
                  onChange={this.handleUsername}
                  name="username"
                  value={this.state.username}
                  validators={["required"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid"
                  ]}
                />
                <br />
                <TextValidator
                  label="Password"
                  onChange={this.handlePassword}
                  name="password"
                  type="password"
                  value={this.state.password}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <br />
                <div className="row no-gutters justify-content-center animated fadeIn mt-2">
                  <div className="col-auto">
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      onClick={this.handleClick}
                      disabled={this.state.submitted}
                    >
                      {(this.state.submitted && "Your form is submitted!") ||
                        (!this.state.submitted && "LOGIN")}
                    </Button>
                  </div>
                </div>
              </ValidatorForm>
              {/* <form className="mt-3 mb-0 animated fadeIn">
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
              </form> */}
              <div className="row no-gutters justify-content-center animated fadeIn mt-2">
                <div className="col-auto">
                  <br />
                  <div className="row justify-content-center mt-2">
                    <div className="col text-center">
                      <GoogleLogin
                        clientId="47584810358-3c8hhvnt9d29ocouqfu2i2dr2v0u5fua.apps.googleusercontent.com"
                        render={renderProps => (
                          <GoogleButton
                            type="light"
                            label="Sign In with Google"
                            data-onsuccess="onSignIn"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                          />
                        )}
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center mt-3">
                  <div className="col text-center">
                    <Link to="/register">
                      <small className="register-text">
                        Don't have an acoount? click here to create an account
                      </small>
                    </Link>
                  </div>
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
