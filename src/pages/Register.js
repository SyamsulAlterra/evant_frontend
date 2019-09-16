import React from "react";
import { connect } from "unistore/react";
import axios from "axios";
import { actions } from "../Store";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import GoogleButton from "react-google-button";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { TransitonGroup, CSSTransition } from "react-transition-group";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import homeLogo from "../images/e.png";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      gender: "",
      display: false
    };
  }

  registerWithGoogle = response => {
    console.log(response);
    const email = response.profileObj.email;
    const boundaryIndex = email.indexOf("@");
    const username = email.slice(0, boundaryIndex);
    const fullname = response.profileObj.name;
    const req = {
      method: "post",
      url: this.props.baseUrl + "users/register_with_google",
      headers: {},
      data: {
        username: username,
        email: email,
        password: "",
        fullname: fullname,
        address: "",
        phone: ""
      }
    };

    const self = this;
    axios(req)
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

  handlePhone = async e => {
    let inputPhone = e.target.value;
    await this.setState({ phone: inputPhone });
    console.log(typeof this.state.phone);
  };

  handleAddress = e => {
    let inputAddress = e.target.value;
    this.setState({ address: inputAddress });
  };

  handleGender = e => {
    let inputGender = e.target.value;
    console.log(inputGender);
    if (inputGender === "true" || inputGender === "") {
      this.setState({ gender: true });
    } else if (inputGender === "false") {
      this.setState({ gender: false });
    }
  };

  handleClick = async () => {
    const number = /^[0-9]+$/;
    if (this.state.name === "") {
      Swal.fire("Error", "Please fill your Full Name", "warning");
      return false;
    }
    if (this.state.username === "") {
      Swal.fire("Error", "Please fill your Username", "warning");
      return false;
    }
    if (this.state.email === "") {
      Swal.fire("Error", "Please fill your email", "warning");
      return false;
    }
    if (this.state.password === "") {
      Swal.fire("Error", "Please fill your password", "warning");
      return false;
    }
    if (this.state.confirmPassword !== this.state.password) {
      Swal.fire(
        "Error",
        "Your passwords doesn't match, please re-check",
        "warning"
      );
      return false;
    }
    if (this.state.phone === "") {
      Swal.fire("Error", "Please fill your Phone Number", "warning");
      return false;
    }
    if (
      !this.state.phone.match(number) ||
      this.state.phone.length > 13 ||
      this.state.phone.length < 10
    ) {
      Swal.fire("Error", "Please fill a valid phone number", "warning");
      return false;
    }
    if (this.state.address === "") {
      Swal.fire("Error", "Please fill your address", "warning");
      return false;
    }
    if (this.state.gender === "") {
      Swal.fire("Error", "Please choose a gender", "warning");
      return false;
    }
    let config = {
      url: this.props.baseUrl + "users/register",
      method: "post",
      data: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        gender: this.state.gender,
        fullname: this.state.name,
        address: this.state.address,
        phone: this.state.phone.toString()
      }
    };

    await axios(config)
      .then(() => {
        Swal.fire(
          "Account Created Successfully",
          "Please proceed to login",
          "success"
        );
        this.props.history.push("/");
      })
      .catch(() => {
        Swal.fire("Oops! Something Went Wrong", "Please Try Again", "error");
      });
  };

  componentDidMount = () => {
    this.setState({ display: true });
  };

  render() {
    return (
      <CSSTransition
        in={this.state.display}
        timeout={5000}
        classNames="display"
        unmountOnExit
        appear
      >
        <div className="container register mobileView">
          <div className="row justify-content-center">
            <div className="col text-center">
              <div className="my-5">
                <img
                  src={homeLogo}
                  alt=""
                  className="text-center mt-5 mb-0"
                  width="75px"
                  height="75px"
                />
                <h1 className="underline mt-1 mb-0 animated fadeInDownBig delay-1s register-evant">
                  Evant
                </h1>
                <hr className="animated fadeIn shadow" width="200px" />
                <p className="mt-0 p-0 mb-4 animated fadeInDownBig delay-1s">
                  Decide When, Where, and Who
                </p>
                <div className="row justify-content-center mb-3">
                  <div className="col-auto text-center">
                    <GoogleLogin
                      clientId="47584810358-62nmr7avsvoep7lagucvlb9hnj39h8jj.apps.googleusercontent.com"
                      render={renderProps => (
                        <GoogleButton
                          label="Sign Up with Google"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        />
                      )}
                      buttonText="Sign Up with Google"
                      onSuccess={this.registerWithGoogle}
                      onFailure={this.registerWithGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                </div>
                <div className="col-12">
                  {/* <form
                    action=""
                    className="register-form form-group animated fadeIn"
                  > */}
                  <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    className="register-form form-group animated fadeIn"
                  >
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
                    <TextValidator
                      label="Fullname"
                      onChange={this.handleName}
                      name="name"
                      value={this.state.name}
                      validators={["required"]}
                      errorMessages={[
                        "this field is required",
                        "Fullname is not valid"
                      ]}
                    />
                    <TextValidator
                      label="Email"
                      onChange={this.handleEmail}
                      name="email"
                      value={this.state.email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "Email is not valid"
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
                    <TextValidator
                      label="Confirm Password"
                      onChange={this.handleConfirmPassword}
                      name="password"
                      type="password"
                      value={this.state.confirmPassword}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <br />
                    <TextValidator
                      label="Phone"
                      onChange={this.handlePhone}
                      name="Phone"
                      value={this.state.phone}
                      validators={["required"]}
                      errorMessages={[
                        "this field is required",
                        "Fullname is not valid"
                      ]}
                    />
                    <TextValidator
                      label="Address"
                      onChange={this.handleAddress}
                      name="address"
                      value={this.state.address}
                      validators={["required"]}
                      errorMessages={[
                        "this field is required",
                        "Fullname is not valid"
                      ]}
                    />
                    <br />
                    <div className="text-left mx-4 mb-4 px-4 mt-3">
                      <input
                        type="radio"
                        name="gender"
                        value={true}
                        onChange={this.handleGender}
                      />
                      Male
                      <br />
                      <input
                        type="radio"
                        name="gender"
                        value={false}
                        onChange={this.handleGender}
                      />
                      Female <br />
                    </div>
                    <div className="row no-gutters justify-content-center animated fadeIn mt-2">
                      <div className="col-auto">
                        <Button
                          className="register-button"
                          color="primary"
                          variant="contained"
                          type="submit"
                          onClick={this.handleClick}
                          disabled={this.state.submitted}
                        >
                          {(this.state.submitted &&
                            "Your form is submitted!") ||
                            (!this.state.submitted && "REGISTER")}
                        </Button>
                      </div>
                    </div>
                  </ValidatorForm>
                  {/* <input
                      type="text"
                      className="mb-3 col-12"
                      placeholder="Full Name"
                      onChange={this.handleName}
                    />
                    <input
                      type="text"
                      className="mb-3 col-12"
                      placeholder="Username"
                      onChange={this.handleUsername}
                    />
                    <input
                      type="email"
                      className="mb-3 col-12"
                      placeholder="Email"
                      onChange={this.handleEmail}
                    />
                    <input
                      type="password"
                      className="mb-3 col-12"
                      placeholder="Password"
                      onChange={this.handlePassword}
                    />
                    <input
                      type="password"
                      className="mb-3 col-12"
                      placeholder="Confirm password"
                      onChange={this.handleConfirmPassword}
                    />
                    <input
                      type="text"
                      className="mb-3 col-12"
                      placeholder="Phone"
                      onChange={this.handlePhone}
                    />
                    <textarea
                      type="text"
                      className="mb-3 col-12"
                      placeholder="Address"
                      onChange={this.handleAddress}
                    />
                    <br />
                    <div className="text-left mx-4 mb-4 px-4">
                      <input
                        type="radio"
                        name="gender"
                        value={true}
                        onChange={this.handleGender}
                      />
                      Male
                      <br />
                      <input
                        type="radio"
                        name="gender"
                        value={false}
                        onChange={this.handleGender}
                      />
                      Female <br />
                    </div>
                  </form> */}
                </div>
                {/* <div className="col-12">
                  <button
                    className="btn btn-block text-center register-button mb-5"
                    onClick={this.handleClick}
                    width="100%"
                  >
                    Register
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(withRouter(Register));
