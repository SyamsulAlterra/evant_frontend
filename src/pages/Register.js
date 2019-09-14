import React from "react";
import Button from "../components/Button";
import { connect } from "unistore/react";
import axios from "axios";
import { actions } from "../Store";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

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
      gender: ""
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
        this.props.history.push("/");
      })
      .catch(() => {
        alert("tes");
      });
    // console.log("tes");
  };

  render() {
    return (
      <div className="container register mobileView">
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
                <input
                  type="text"
                  className="m-2"
                  placeholder="Phone"
                  onChange={this.handlePhone}
                />
                <textarea
                  type="text"
                  className="m-2"
                  placeholder="Address"
                  onChange={this.handleAddress}
                />
                <br />
                <div className="text-left mx-5 px-4">
                  <input
                    type="radio"
                    name="gender"
                    value={true}
                    onChange={this.handleGender}
                    // checked="checked"
                  />
                  Male
                  <br />
                  <input
                    type="radio"
                    name="gender"
                    value={false}
                    onChange={this.handleGender}
                    // checked="checked"
                  />
                  Female <br />
                </div>
              </form>
              <Button
                className="mt-5"
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

export default connect(
  "baseUrl",
  actions
)(withRouter(Register));
