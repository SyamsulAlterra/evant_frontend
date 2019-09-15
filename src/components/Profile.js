import React from "react";
import fotoProfil from "../images/profile.png";
import editIcon from "../images/edit.png";
import username from "../images/username.png";
import address from "../images/address.png";
import email from "../images/mail.png";
import phone from "../images/phone.png";
import gender from "../images/gender.png";
import axios from "axios";
import { connect } from "unistore/react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      address: localStorage.getItem("address"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone")
    };
  }

  handleUsername = async e => {
    let inputUsername = e.target.value;
    await this.setState({ username: inputUsername });
  };

  handleAddress = async e => {
    let inputAddress = e.target.value;
    await this.setState({ address: inputAddress });
  };

  handleEmail = async e => {
    let inputEmail = e.target.value;
    await this.setState({ email: inputEmail });
  };

  handlePhone = async e => {
    let inputPhone = e.target.value;
    await this.setState({ phone: inputPhone });
  };

  handlePassword = async e => {
    let inputPassword = e.target.value;
    await this.setState({ password: inputPassword });
  };

  handleConfirmPassword = async e => {
    let inputConfirmpassword = e.target.value;
    await this.setState({ confirmPassword: inputConfirmpassword });
  };

  editProfile = async e => {
    e.preventDefault();
    const self = this;
    await axios
      .put(
        this.props.baseUrl +
        "users/" +
        parseInt(localStorage.getItem("user_id")),
        {
          username: self.state.username
        }
      )
      .then(response => {
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("address", this.state.address);
        localStorage.setItem("email", this.state.email);
        localStorage.setItem("phone", this.state.phone);
        window.location.reload();
      });
  };

  editPassword = async e => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      await axios.put(
        this.props.baseUrl +
        "users/" +
        parseInt(localStorage.getItem("user_id")),
        {
          password: this.state.password
        }
      );
    } else {
      alert("new password doesnt match");
    }
  };

  render() {
    return (
      <div className="profile p-5">
        <div className="container mobileView animated fadeIn">
          <div className="row border shadow my-4">
            <div className="col text-center">
              <div className="fullname">
                <h3 className="my-5">{localStorage.getItem("fullname")}</h3>
              </div>
              <div className="profil-avatar mt-3 mb-5">
                <img src={fotoProfil} className="profileImage" alt=""></img>
              </div>
              <div className="p-0">
                <div className="username mb-3">
                  <div className="row justify-content-center">
                    <div className="col-7">
                      <img
                        src={username}
                        height="20px"
                        width="20px"
                        className="float-left"
                      />
                      <h6 className="m-0">
                        {localStorage.getItem("username")}
                      </h6>
                    </div>
                    <div className="col-5">
                      <img
                        src={editIcon}
                        alt=""
                        height="15px"
                        width="15px"
                        data-toggle="modal"
                        data-target="#editUsername"
                        className="float-right"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="address mb-3">
                  <div className="row justify-content-center">
                    <div className="col-7">
                      <img
                        src={address}
                        height="20px"
                        width="20px"
                        className="float-left"
                      />
                      <h6 className="m-0">
                        &nbsp;{localStorage.getItem("address")}
                      </h6>
                    </div>
                    <div className="col-5">
                      <img
                        src={editIcon}
                        height="15px"
                        alt=""
                        width="15px"
                        data-toggle="modal"
                        data-target="#editAddress"
                        className="float-right"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="email mb-3">
                  <div className="row justify-content-center">
                    <div className="col-7">
                      <img
                        src={email}
                        height="20px"
                        width="20px"
                        className="float-left"
                      />
                      <h6 className="m-0">
                        &nbsp;{localStorage.getItem("email")}
                      </h6>
                    </div>
                    <div className="col-5">
                      <img
                        src={editIcon}
                        alt=""
                        height="15px"
                        width="15px"
                        data-toggle="modal"
                        data-target="#email"
                        className="float-right"
                      />
                    </div>
                  </div>
                  <span className="m-0"></span>
                </div>
                <br />
                <div className="phone mb-3">
                  <div className="row justify-content-center">
                    <div className="col-7">
                      <img
                        src={phone}
                        height="20px"
                        width="20px"
                        className="float-left"
                      />
                      <h6 className="m-0">{localStorage.getItem("phone")}</h6>
                    </div>
                    <div className="col-5">
                      <img
                        src={editIcon}
                        alt=""
                        height="15px"
                        width="15px"
                        data-toggle="modal"
                        data-target="#editPhone"
                        className="float-right"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="row justify-content-left">
                  <div className="col-7">
                    <div className="gender">
                      <img
                        src={gender}
                        height="20px"
                        width="20px"
                        className="float-left"
                      />
                      <span className="m-0">
                        {" "}
                        &nbsp;
                        {localStorage.getItem("gender") === "true"
                          ? "male"
                          : "female"}
                      </span>
                    </div>
                  </div>
                </div>
                <br />
              </div>
              <div className="row">
                <div className="col-6 text-left">
                  <button
                    className="btn my-3 p-1 change-pass-button"
                    data-toggle="modal"
                    data-target="#changePassword"
                  >
                    <small>Change Password</small>
                  </button>
                </div>

                {/* start modal */}

                {/* modal change password */}
                <div
                  class="modal fade"
                  id="changePassword"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Change Your Password
                        </h5>
                      </div>
                      <div class="modal-body">
                        <input
                          type="password"
                          className="m-2"
                          placeholder="New Password"
                          onChange={this.handlePassword}
                        ></input>
                        <br />
                        <input
                          type="password"
                          className="m-2"
                          placeholder="Confirm New Password"
                          onChange={this.handleConfirmPassword}
                        ></input>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn change-pass-button"
                          data-dismiss="modal"
                          onClick={this.editPassword}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* modal change user name */}
                <div
                  class="modal fade"
                  id="editUsername"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Change Your Username
                        </h5>
                      </div>
                      <div class="modal-body">
                        <input
                          type="text"
                          className="m-2"
                          placeholder="New Username"
                          onChange={this.handleUsername}
                        ></input>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn change-pass-button"
                          data-dismiss="modal"
                          onClick={this.editProfile}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* modal change address */}
                <div
                  class="modal fade"
                  id="editAddress"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Change Your Address
                        </h5>
                      </div>
                      <div class="modal-body">
                        <input
                          type="text"
                          className="m-2"
                          placeholder="New Address"
                          onChange={this.handleAddress}
                        ></input>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn change-pass-button"
                          data-dismiss="modal"
                          onClick={this.editProfile}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* modal change email */}
                <div
                  class="modal fade"
                  id="email"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Change Your Email
                        </h5>
                      </div>
                      <div class="modal-body">
                        <input
                          type="text"
                          className="m-2"
                          placeholder="New Email"
                          onChange={this.handleEmail}
                        ></input>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn change-pass-button"
                          data-dismiss="modal"
                          onClick={this.editProfile}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* modal change phone */}
                <div
                  class="modal fade"
                  id="editPhone"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Change Your Phone Number
                        </h5>
                      </div>
                      <div class="modal-body">
                        <input
                          type="text"
                          className="m-2"
                          placeholder="New Phone Number"
                          onChange={this.handlePhone}
                        ></input>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn change-pass-button"
                          data-dismiss="modal"
                          onClick={this.editProfile}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* end modals */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect("baseUrl")(Profile);
