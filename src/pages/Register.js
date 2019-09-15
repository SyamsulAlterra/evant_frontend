import React from "react";
import { connect } from "unistore/react";
import axios from "axios";
import { actions } from "../Store";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { TransitonGroup, CSSTransition } from "react-transition-group";
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
                <p className="mt-0 p-0 mb-5 animated fadeInDownBig delay-1s">
                  Decide When, Where, and Who
                </p>
                <div className="col-12">
                  <form
                    action=""
                    className="register-form form-group animated fadeIn"
                  >
                    <input
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
                  </form>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-block text-center register-button mb-5"
                    onClick={this.handleClick}
                    width="100%"
                  >
                    Register
                  </button>
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
