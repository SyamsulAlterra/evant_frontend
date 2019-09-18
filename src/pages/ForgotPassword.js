import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import axios from "axios";
import Swal from "sweetalert2";
import { CSSTransition } from "react-transition-group";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "bootstrap/dist/js/bootstrap.bundle";
import { InputAdornment, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { RemoveRedEye } from "@material-ui/icons";
import PropTypes from "prop-types";
import red from "@material-ui/core/colors/red";

const red300 = red["500"];

const style = {
  right: 0,
  fontSize: "12px",
  color: red300,
  width: "240px"
  // marginTop: "-50px"
};

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
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleEmail = async e => {
    let inputEmail = e.target.value;
    await this.setState({ email: inputEmail });
    console.log(typeof this.state.email);
  };

  handlePassword = e => {
    let inputPassword = e.target.value;
    this.setState({ password: inputPassword });
  };

  handleConfirm = e => {
    let inputConfirm = e.target.value;
    this.setState({ confirmPassword: inputConfirm });
  };

  handleClick = async response => {
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
    if (this.state.confirmPassword !== this.state.password) {
      Swal.fire(
        "Error",
        "Your passwords doesn't match, please re-check",
        "warning"
      );
      return false;
    }
    const req = {
      method: "post",
      url: this.props.baseUrl + "users/add_new_password",
      headers: {},
      data: {
        email: this.state.email,
        new_password: this.state.password
      }
    };

    const self = this;
    await axios(req)
      .then(function(response) {
        console.log("login as", response.data);
        self.props.history.push("/");
      })
      .catch(function(error) {
        console.log("ERROR", error);
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
          <div className="row justify-content-center mt-3">
            <div className="col text-center">
              <div className="my-5">
                <div className="col-12">
                  <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    className="register-form form-group animated fadeIn"
                  >
                    <br />
                    <TextValidator
                      style={style}
                      label="Username"
                      onChange={this.handleEmail}
                      name="Username"
                      value={this.state.email}
                      validators={["required"]}
                      errorMessages={[
                        "this field is required",
                        "Fullname is not valid"
                      ]}
                    />
                    <PasswordInput
                      label="New Password"
                      style={style}
                      name="password"
                      value={this.state.password}
                      onChange={this.handlePassword}
                    />
                    <PasswordInput
                      label="Password"
                      style={style}
                      name="password"
                      value={this.state.confirmPassword}
                      onChange={this.handleConfirm}
                    />
                    <br />
                    <div className="row no-gutters justify-content-center animated fadeIn mt-5">
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
                            (!this.state.submitted && "SUBMIT")}
                        </button>
                      </div>
                    </div>
                  </ValidatorForm>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col text-center">
              <div className="my-5">
                <h1 className="underline mt-1 mb-0 animated fadeInDownBig delay-1s register-evant">
                  Evant
                </h1>
                <hr className="animated fadeIn shadow" width="200px" />
                <p className="mt-0 p-0 mb-4 animated fadeInDownBig delay-1s">
                  Decide When, Where, and Who
                </p>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default connect("baseUrl")(withRouter(ForgotPassword));
