import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import axios from "axios";
import Swal from "sweetalert2";
import { CSSTransition } from "react-transition-group";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "bootstrap/dist/js/bootstrap.bundle";
import homeLogo from "../images/logo_transparent.png";
import red from "@material-ui/core/colors/red";

/*
styling in input field
*/
const red300 = red["500"];

const style = {
  right: 0,
  fontSize: "12px",
  color: red300,
  width: "240px"
  // marginTop: "-50px"
};

/*
This is a statefull class to handle google register, and everything inside it
*/
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
  and has purpose to send request for registering with google
  */
  handleClick = async response => {
    await this.setState({ phone: "Entry your phone" })

    await this.setState({ address: "Entry your address" })

    if (this.state.gender === "") {
      Swal.fire("Error", "Please choose a gender", "warning");
      return false;
    }
    /*
    post some data from google+ into database
    */
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
        phone: this.state.phone
      }
    };

    const self = this;
    await axios(req)
      .then(function (response) {
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
      .catch(function (error) {
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
        {/* 
        this view has purpose for showing google register page 
        */}
        <div className="container register mobileView">
          <div className="row justify-content-center mt-3">
            <div className="col text-center">
              <div className="my-5 grey">
                <h4 className="underline home-evant animated fadeIn grey">
                  {/* my-1 */}
                  Evant
                </h4>
                {/* <hr className="animated fadeIn shadow" width="200px" /> */}
                <h6 className="mt-0 p-0 mb-0 animated fadeInDownBig delay-1s">
                  Decide When, Where, and Who
                </h6>
                <img
                  src={homeLogo}
                  alt=""
                  className="text-center animated bounceInDown delay-1s"
                  width="50%"
                  height="50%"
                />
                <div className="col-12">
                  <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    className="register-form form-group animated fadeIn"
                  >
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
