import React from "react";
import { connect } from "unistore/react";
import axios from "axios";
import { actions } from "../Store";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { CSSTransition } from "react-transition-group";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import homeLogo from "../images/logo_transparent.png";
import red from "@material-ui/core/colors/red";
import { InputAdornment, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { RemoveRedEye } from "@material-ui/icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/*
make cursor pointer when touch the field
*/
const styles = theme => ({
  eye: {
    cursor: "pointer"
  }
});

/*
Class for handle hide and show password
*/
class PasswordInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordIsMasked: true
    };
  }

  /*
  for checking the current condition with previous, 
  for example, (statePrevious = text, then currentState =  )
  */
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

/*
This object to collect values in password handle state
*/
PasswordInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

PasswordInput = withStyles(styles)(PasswordInput);

/* --------------------------------------------------------- */

const red300 = red["500"];

/*
styling in input field
*/
const style = {
  right: 0,
  fontSize: "12px",
  color: red300,
  width: "240px"
};

/*
This is a statefull class to handle register page, and everything inside it
*/
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      gender: "",
      display: false
    };
  }

  /*
  for handle name value in field input
  */
  handleName = e => {
    let inputName = e.target.value;
    this.setState({ name: inputName });
  };

  /*
  for handle username value in field input
  */
  handleUsername = e => {
    let inputUsername = e.target.value;
    this.setState({ username: inputUsername });
  };

  /*
  for handle email value in field input
  */
  handleEmail = e => {
    let inputEmail = e.target.value;
    this.setState({ email: inputEmail });
  };

  /*
  for handle password value in field input
  */
  handlePassword = e => {
    let inputPassword = e.target.value;
    this.setState({ password: inputPassword });
  };

  /*
  for handle gender value in field input
  */
  handleGender = e => {
    let inputGender = e.target.value;
    console.log(inputGender);
    if (inputGender === "true" || inputGender === "") {
      this.setState({ gender: true });
    } else if (inputGender === "false") {
      this.setState({ gender: false });
    }
  };

  /*
  this function has purpose to validation input/value,
  and has purpose to send request for registering 
  */
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
    if (this.state.password.length < 6) {
      Swal.fire(
        "Error",
        "Password must contain at least six characters!",
        "warning"
      );
      return false;
    }
    let re = /[0-9]/;
    if (!re.test(this.state.password)) {
      Swal.fire(
        "Error",
        "password must contain at least one number!",
        "warning"
      );
      return false;
    }
    re = /[!@#\$%\^&]/;
    if (!re.test(this.state.password)) {
      Swal.fire(
        "Error",
        "password must contain at least one special character!",
        "warning"
      );
      return false;
    }
    re = /[a-z]/;
    if (!re.test(this.state.password)) {
      Swal.fire(
        "Error",
        "password must contain at least one lowercase letter!",
        "warning"
      );
      return false;
    }
    re = /[A-Z]/;
    if (!re.test(this.state.password)) {
      Swal.fire(
        "Error",
        "password must contain at least one uppercase letter!",
        "warning"
      );
      return false;
    }

    if (this.state.phone === "") {
      this.setState({ phone: "Entry your phone" })
      return false;
    }
    console.log(this.state.phone)
    if (this.state.address === "") {
      this.setState({ address: "Entry your address" })
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
        phone: this.state.phone
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
        {/* 
        show view of login page 
        */}
        <div className="container register mobileView">
          <div className="row justify-content-center">
            <div className="col text-center">

              {/* home logo */}
              <div className="my-5 grey">
                <h2 className="underline mt-1 mb-0 animated fadeInDownBig delay-1s register-evant grey">
                  Evant
                </h2>
                <p className="mt-0 p-0 mb-0 animated fadeInDownBig delay-1s">
                  Decide When, Where, and Who
                </p>
                <img
                  src={homeLogo}
                  alt=""
                  className="text-center mt-0 mb-4"
                  width="75px"
                  height="75px"
                />
                <div className="col-12">
                  {/* 
                  these are form input, consist of username, email, etc.
                  password and there are some event handler for taking input/control of those 
                  */}
                  <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    className="register-form form-group animated fadeIn"
                  >
                    <TextValidator
                      style={style}
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
                      style={style}
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
                      style={style}
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
                    <PasswordInput
                      label="Password"
                      style={style}
                      name="password"
                      value={this.state.password}
                      onChange={this.handlePassword}
                    ></PasswordInput>
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
                          {(this.state.submitted &&
                            "Your form is submitted!") ||
                            (!this.state.submitted && "REGISTER")}
                        </button>
                      </div>
                    </div>

                    {/* login page */}
                    <div className="row" >
                      <div className="col-12 text-center mt-4">
                        <Link to="/">
                          <small className="register-text">
                            Already have accout?
                      </small>
                        </Link>
                      </div>
                    </div>

                  </ValidatorForm>
                </div>
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
