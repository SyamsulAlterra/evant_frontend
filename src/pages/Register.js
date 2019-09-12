import React from "react";
import Button from "../components/Button";
import Axios from "axios";

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

  handlePhone = e => {
    let inputPhone = e.target.value;
    this.setState({ phone: inputPhone });
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
    console.log(this.state);
    let config = {
      url: "http://0.0.0.0:5000/api/users/register",
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

    let register = await Axios(config);
    console.log(register);
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

export default Register;
