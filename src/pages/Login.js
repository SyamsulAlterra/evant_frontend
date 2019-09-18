import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import axios from "axios";
import Swal from "sweetalert2";
import { CSSTransition } from "react-transition-group";
import GoogleButton from "react-google-button";
import { GoogleLogin } from "react-google-login";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "bootstrap/dist/js/bootstrap.bundle";
import { InputAdornment, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { RemoveRedEye } from "@material-ui/icons";
import PropTypes from "prop-types";
import homeLogo from "../images/logo_transparent.png";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  eye: {
    cursor: "pointer"
  }
});

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordIsMasked: true
    };
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked
    }));
  };

  render() {
    const { classes } = this.props;
    const { passwordIsMasked } = this.state;

    return (
      <TextField
        type={passwordIsMasked ? "password" : "text"}
        {...this.props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <RemoveRedEye
                className={classes.eye}
                onClick={this.togglePasswordMask}
              />
            </InputAdornment>
          )
        }}
      />
    );
  }
}

PasswordInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

PasswordInput = withStyles(styles)(PasswordInput);

/* --------------------------------------------------------- */

const red300 = red["500"];

const style = {
  right: 0,
  fontSize: "12px",
  color: red300,
  width: "240px"
  // marginTop: "-50px"
};

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
    const email = response.profileObj.email;
    const boundaryIndex = email.indexOf("@");
    const username = email.slice(0, boundaryIndex);
    const fullname = response.profileObj.name;
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
    if (response.profileObj.email) {
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
          localStorage.setItem("google_token", response.tokenId);
          localStorage.setItem("email", email);
          localStorage.setItem("fullname", fullname);
          localStorage.setItem("username", username);
          self.props.history.push("/googleRegister");
          console.log("ERROR", error);
        });
    }
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
              <div className="home-logo my-3">
                <img
                  src={homeLogo}
                  alt=""
                  className="text-center mb-2 animated bounceInDown delay-1s"
                  width="70%"
                  height="70%"
                />
                <h1 className="underline home-evant animated fadeIn">
                  {/* my-1 */}
                  Evant
                </h1>
                <hr className="animated fadeIn shadow" width="200px" />
                <p className="mt-0 p-0 mb-4 animated fadeInDownBig delay-1s">
                  Decide When, Where, and Who
                </p>
              </div>
              <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                <i class="icon-mobile-phone icon-large"></i>
                <TextValidator
                  style={style}
                  className="edit-button"
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
                <i class="icon-unlock-alt"></i>
                <PasswordInput
                  label="Password"
                  style={style}
                  name="password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                ></PasswordInput>
                <br />
                <Link to="/forgotPassword">
                  <small className="register-text">Forgot password?</small>
                </Link>
                <div className="row no-gutters justify-content-center animated fadeIn mt-2">
                  <div className="col-auto mt-3">
                    <button
                      color="primary"
                      size="large"
                      variant="contained"
                      type="submit"
                      onClick={this.handleClick}
                      disabled={this.state.submitted}
                      type="button"
                      class="btn btn-primary edit-button"
                    >
                      {(this.state.submitted && "Your form is submitted!") ||
                        (!this.state.submitted && "LOGIN")}
                    </button>
                  </div>
                </div>
              </ValidatorForm>

              <div className="row no-gutters justify-content-center animated fadeIn mt-5">
                <div className="col-auto">
                  <br />
                  <div className="row justify-content-center">
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
                <div className="row justify-content-center mb-5">
                  <div className="col text-center">
                    <Link to="/register">
                      <small className="register-text">
                        Don't have an acoount? click here to register
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
