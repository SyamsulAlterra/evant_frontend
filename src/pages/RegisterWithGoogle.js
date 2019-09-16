import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import axios from "axios";
import Swal from "sweetalert2";
import { CSSTransition } from "react-transition-group";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "bootstrap/dist/js/bootstrap.bundle";
import homeLogo from "../images/logo_transparent.png";

class GoogleRegister extends React.Component {
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

  handleClick = async response => {
    const number = /^[0-9]+$/;
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
    // let config = {
    //   url: this.props.baseUrl + "users/register",
    //   method: "post",
    //   data: {
    //     username: this.state.username,
    //     email: this.state.email,
    //     password: this.state.password,
    //     gender: this.state.gender,
    //     fullname: this.state.name,
    //     address: this.state.address,
    //     phone: this.state.phone.toString()
    //   }
    // };

    // await axios(config)
    //   .then(() => {
    //     Swal.fire(
    //       "Account Created Successfully",
    //       "Please proceed to login",
    //       "success"
    //     );
    //     this.props.history.push("/");
    //   })
    //   .catch(() => {
    //     Swal.fire("Oops! Something Went Wrong", "Please Try Again", "error");
    //   });

    // console.log(response);
    // const email = response.profileObj.email;
    // const boundaryIndex = email.indexOf("@");
    // const username = email.slice(0, boundaryIndex);
    // const fullname = response.profileObj.name;
    const req = {
      method: "post",
      url: this.props.baseUrl + "users/register_with_google",
      headers: {},
      data: {
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
        password: "",
        gender: this.state.gender,
        fullname: localStorage.getItem("fullname"),
        address: this.state.address,
        phone: this.state.phone.toString()
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default connect("baseUrl")(withRouter(GoogleRegister));
