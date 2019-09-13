import React from "react";
import fotoProfil from "../images/profile.png";
import editIcon from "../images/edit.png";
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
    const self = this;
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
      <div className="profile">
        <div className="container mobileView">
          <div className="row border my-4">
            <div className="col text-center">
              <div className="fullname">
                <h3 className="mt-4 mb-0">
                  {localStorage.getItem("fullname")}
                </h3>
              </div>
              <div className="avatar my-5">
                <img src={fotoProfil} className="profileImage m-3"></img>
              </div>
              <div className="text-left p-0">
                <div className="username mb-3">
                  <div className="row justify-content-center">
                    <div className="col-7">
                      <h6 className="m-0">
                        username: {localStorage.getItem("username")}
                      </h6>
                    </div>
                    <div className="col-5">
                      <img
                        src={editIcon}
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
                      <h6 className="m-0">
                        address: {localStorage.getItem("address")}
                      </h6>
                    </div>
                    <div className="col-5">
                      <img
                        src={editIcon}
                        height="15px"
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
                      <h6 className="m-0">
                        email: {localStorage.getItem("email")}
                      </h6>
                    </div>
                    <div className="col-5">
                      <img
                        src={editIcon}
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
                      <h6 className="m-0">
                        phone: {localStorage.getItem("phone")}
                      </h6>
                    </div>
                    <div className="col-5">
                      <img
                        src={editIcon}
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
                <div className="gender">
                  <span className="m-0">
                    gender:{" "}
                    {localStorage.getItem("gender") === true
                      ? "male"
                      : "female"}
                  </span>
                </div>
                <br />
              </div>
              <div className="row">
                <div className="col-6 text-left">
                  <button
                    className="btn btn-info my-3 p-1"
                    data-toggle="modal"
                    data-target="#changePassword"
                  >
                    Change Password
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
                          Change Password
                        </h5>
                      </div>
                      <div class="modal-body">
                        <input
                          type="password"
                          className="m-2"
                          placeholder="new password"
                          onChange={this.handlePassword}
                        ></input>
                        <br />
                        <input
                          type="password"
                          className="m-2"
                          placeholder="confirm new password"
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
                          class="btn btn-primary"
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
                          Edit Username
                        </h5>
                      </div>
                      <div class="modal-body">
                        <input
                          type="text"
                          className="m-2"
                          placeholder="username"
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
                          class="btn btn-primary"
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
                          Edit Address
                        </h5>
                      </div>
                      <div class="modal-body">
                        <input
                          type="text"
                          className="m-2"
                          placeholder="address"
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
                          class="btn btn-primary"
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
                          Edit Email
                        </h5>
                      </div>
                      <div class="modal-body">
                        <input
                          type="text"
                          className="m-2"
                          placeholder="Email"
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
                          class="btn btn-primary"
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
                          Edit Phone
                        </h5>
                      </div>
                      <div class="modal-body">
                        <input
                          type="text"
                          className="m-2"
                          placeholder="Phone"
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
                          class="btn btn-primary"
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
