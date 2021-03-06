import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import firebase from "firebase";
import Swal from "sweetalert2";
import { connect } from "unistore/react";
import fotoProfil from "../images/manager.png";
import editIcon from "../images/edit.png";
import username from "../images/username.png";
import address from "../images/address.png";
import email from "../images/mail.png";
import phone from "../images/phone.png";
import gender from "../images/gender.png";
import LogOut from "../components/LogOut";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      address: localStorage.getItem("address"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone"),
      usernameModalShow: false,
      addressModalShow: false,
      emailModalShow: false,
      phoneModalShow: false,
      passwordModalShow: false,
      uploadedFile: {}
    };
  }

  // handle change in username field
  handleUsername = async e => {
    let inputUsername = e.target.value;
    await this.setState({ username: inputUsername });
  };

  // handle change in address field
  handleAddress = async e => {
    let inputAddress = e.target.value;
    await this.setState({ address: inputAddress });
  };

  // handle change in email field
  handleEmail = async e => {
    let inputEmail = e.target.value;
    await this.setState({ email: inputEmail });
  };

  // handle change in phone field
  handlePhone = async e => {
    let inputPhone = e.target.value;
    await this.setState({ phone: inputPhone });
  };

  // handle change in password field
  handlePassword = async e => {
    let inputPassword = e.target.value;
    await this.setState({ password: inputPassword });
  };

  // handle change in confirm password field
  handleConfirmPassword = async e => {
    let inputConfirmpassword = e.target.value;
    await this.setState({ confirmPassword: inputConfirmpassword });
  };

  // method to open and close modal
  handleToggle = () => {
    this.setState({
      usernameModalShow: false,
      addressModalShow: false,
      emailModalShow: false,
      phoneModalShow: false,
      passwordModalShow: false,
      newPhoto: ""
    });
  };

  // method to edit username to database
  editUsername = async e => {
    e.preventDefault();
    const self = this;

    //validation
    if (this.state.username === "" || this.state.username === null) {
      Swal.fire("Error", "Please fill your new Username", "warning");
      return false;
    }
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
        Swal.fire("Success", "Your Data Has Been Changed", "success");
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      })
      .catch(error => {
        Swal.fire("Oops! Something Went Wrong", "Please Try Again", "warning");
      });
  };

  // method to edit address to database
  editAddress = async e => {
    e.preventDefault();
    const self = this;

    // validation
    if (this.state.address === "" || this.state.address === null) {
      Swal.fire("Error", "Please fill your address", "warning");
      return false;
    }
    await axios
      .put(
        this.props.baseUrl +
          "users/" +
          parseInt(localStorage.getItem("user_id")),
        {
          address: self.state.address
        }
      )
      .then(response => {
        localStorage.setItem("address", this.state.address);
        Swal.fire("Success", "Your Data Has Been Changed", "success");
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      })
      .catch(error => {
        Swal.fire("Oops! Something Went Wrong", "Please Try Again", "warning");
      });
  };

  // method to edit email to database
  editEmail = async e => {
    e.preventDefault();
    const self = this;

    // validation
    if (this.state.email === "" || this.state.email === null) {
      Swal.fire("Error", "Please fill your new email", "warning");
      return false;
    }
    await axios
      .put(
        this.props.baseUrl +
          "users/" +
          parseInt(localStorage.getItem("user_id")),
        {
          email: self.state.email
        }
      )
      .then(response => {
        localStorage.setItem("email", this.state.email);
        Swal.fire("Success", "Your Data Has Been Changed", "success");
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      })
      .catch(error => {
        Swal.fire("Oops! Something Went Wrong", "Please Try Again", "warning");
      });
  };

  // method to edit phonee to database
  editPhone = async e => {
    e.preventDefault();
    const self = this;
    const number = /^[0-9]+$/;

    // validation
    if (this.state.phone === "" || this.state.phone === null) {
      Swal.fire("Error", "Please fill your new Phone Number", "warning");
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
    await axios
      .put(
        this.props.baseUrl +
          "users/" +
          parseInt(localStorage.getItem("user_id")),
        {
          phone: self.state.phone
        }
      )
      .then(response => {
        localStorage.setItem("phone", this.state.phone);
        Swal.fire("Success", "Your Data Has Been Changed", "success");
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      })
      .catch(error => {
        Swal.fire("Oops! Something Went Wrong", "Please Try Again", "warning");
      });
  };

  // method to edit password to database
  editPassword = async e => {
    e.preventDefault();
    if (this.state.password === "") {
      Swal.fire("Error", "Please fill your new password", "warning");
      return false;
    }
    if (this.state.password.length < 6) {
      Swal.fire(
        "Error",
        "New Password must contain at least six characters!",
        "warning"
      );
      return false;
    }

    // validation
    let re = /[0-9]/;
    if (!re.test(this.state.password)) {
      Swal.fire(
        "Error",
        "New password must contain at least one number!",
        "warning"
      );
      return false;
    }
    re = /[!@#\$%\^&]/;
    if (!re.test(this.state.password)) {
      Swal.fire(
        "Error",
        "New password must contain at least one special character!",
        "warning"
      );
      return false;
    }
    re = /[a-z]/;
    if (!re.test(this.state.password)) {
      Swal.fire(
        "Error",
        "New password must contain at least one lowercase letter!",
        "warning"
      );
      return false;
    }
    re = /[A-Z]/;
    if (!re.test(this.state.password)) {
      Swal.fire(
        "Error",
        "New password must contain at least one uppercase letter!",
        "warning"
      );
      return false;
    }
    if (this.state.confirmPassword !== this.state.password) {
      Swal.fire(
        "Error",
        "Your passwords don't match, please re-check",
        "warning"
      );
      return false;
    }
    if (this.state.password === this.state.confirmPassword) {
      await axios
        .post(this.props.baseUrl + "users/add_new_password", {
          email: this.state.email,
          new_password: this.state.password
        })
        .then(response => {
          Swal.fire("Success", "Your Password Has Been Changed", "success");
          setTimeout(function() {
            window.location.reload();
          }, 1000);
        })
        .catch(error => {
          Swal.fire(
            "Oops! Something Went Wrong",
            "Please Try Again",
            "warning"
          );
        });
    } else {
      Swal.fire("Error", "Your New Password Doesn't Match", "warning");
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // handle change in upload photo field
  handleImage = async e => {
    let file = e.target.files[0];

    // validation photo file format
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      Swal.fire(
        "Error",
        "Invalid Picture Format, Please Check Your File",
        "error"
      );
      return false;
    } else {
      this.setState({ file: file });
    }
  };

  // method to upload profile photo
  upload = async file => {
    if (file === undefined) {
      Swal.fire("error", "you photo profil need in .jpg format", "error");
      return false;
    } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
      Swal.fire("error", "you photo profil need in .jpg format", "error");
      return false;
    }

    let filename = file.name;

    let storageRef = firebase
      .storage()
      .ref(`profile_pictures/${localStorage.getItem("username")}`);

    let response = await storageRef.put(file);

    let url = await storageRef.getDownloadURL();
    localStorage.setItem("photoUrl", url);
    window.location.reload();
  };

  render() {
    return (
      <div className="profile mbForFooter">
        {/* container profile detail */}
        <div className="container mobileView animated fadeIn mt-5">
          <div className="row justify-content-center">
            <div className="col-10 text-center">
              <div className="fullname fontstyle">
                <h3 className="my-5">{localStorage.getItem("fullname")}</h3>
              </div>
              <div className="mb-4">
                {[1].map(dummy => {
                  if (localStorage.getItem("photoUrl") === null) {
                    return (
                      <img
                        src={fotoProfil}
                        className="profileImage my-3"
                        alt=""
                      ></img>
                    );
                  } else {
                    return (
                      <img
                        src={localStorage.getItem("photoUrl")}
                        className="profileImage my-3"
                        alt=""
                      ></img>
                    );
                  }
                })}
                <input type="file" onChange={this.handleImage}></input>
                <button
                  className="btn btn-success m-2"
                  onClick={() => this.upload(this.state.file)}
                >
                  upload
                </button>
              </div>
              <div className="p-0">
                <div className="username mb-3">
                  <div className="row justify-content-center">
                    <div className="col-10">
                      <img
                        src={username}
                        alt=""
                        height="20px"
                        width="20px"
                        className="float-left"
                      />
                      <h6 className="m-0 float-left">
                        &nbsp;{localStorage.getItem("username")}
                      </h6>
                    </div>
                    <div className="col-2">
                      <img
                        src={editIcon}
                        alt=""
                        height="15px"
                        width="15px"
                        className="float-right"
                        onClick={() =>
                          this.setState({
                            usernameModalShow: true,
                            username: null
                          })
                        }
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Edit Username"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="address mb-3">
                  <div className="row justify-content-center">
                    <div className="col-10">
                      <img
                        alt=""
                        src={address}
                        height="20px"
                        width="20px"
                        className="float-left"
                      />
                      <h6 className="m-0 float-left">
                        &nbsp;{localStorage.getItem("address")}
                      </h6>
                    </div>
                    <div className="col-2">
                      <img
                        src={editIcon}
                        height="15px"
                        alt=""
                        width="15px"
                        className="float-right"
                        onClick={() =>
                          this.setState({
                            addressModalShow: true,
                            address: null
                          })
                        }
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Edit Address"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="email mb-3">
                  <div className="row justify-content-center">
                    <div className="col-10">
                      <img
                        alt=""
                        src={email}
                        height="20px"
                        width="20px"
                        className="float-left"
                      />
                      <h6 className="m-0 float-left">
                        &nbsp;{localStorage.getItem("email")}
                      </h6>
                    </div>
                    <div className="col-2">
                      <img
                        src={editIcon}
                        alt=""
                        height="15px"
                        width="15px"
                        className="float-right"
                        onClick={() =>
                          this.setState({ emailModalShow: true, email: null })
                        }
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Edit Email"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="phone mb-3">
                  <div className="row justify-content-center">
                    <div className="col-10">
                      <img
                        alt=""
                        src={phone}
                        height="20px"
                        width="20px"
                        className="float-left"
                      />
                      <h6 className="m-0 float-left">
                        {localStorage.getItem("phone")}
                      </h6>
                    </div>
                    <div className="col-2">
                      <img
                        src={editIcon}
                        alt=""
                        height="15px"
                        width="15px"
                        className="float-right"
                        onClick={() =>
                          this.setState({ phoneModalShow: true, phone: null })
                        }
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Edit Phone"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="row justify-content-left">
                  <div className="col-10">
                    <div className="gender">
                      <img
                        alt=""
                        src={gender}
                        height="20px"
                        width="20px"
                        className="float-left"
                      />
                      <span className="m-0 float-left">
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
                    onClick={() => this.setState({ passwordModalShow: true })}
                  >
                    <small>Change Password</small>
                  </button>
                </div>

                <div className="col-6 my-2 text-right p-0">
                  <LogOut></LogOut>
                </div>

                {/* start modal */}

                {/* modal change password */}
                <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  show={this.state.passwordModalShow}
                  centered
                >
                  <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Change Your Password
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      type="password"
                      className="p-2 col-12"
                      placeholder="New Password"
                      onChange={this.handlePassword}
                    ></input>
                    <input
                      type="password"
                      className="p-2 col-12"
                      placeholder="Confirm New Password"
                      onChange={this.handleConfirmPassword}
                    ></input>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleToggle}>Close</Button>
                    <Button onClick={this.editPassword}>Confirm</Button>
                  </Modal.Footer>
                </Modal>

                {/* modal change user name */}
                <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  show={this.state.usernameModalShow}
                  centered
                >
                  <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Change Your Username
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      type="text"
                      className="p-2 col-12"
                      placeholder="New Username"
                      onChange={this.handleUsername}
                    ></input>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleToggle}>Close</Button>
                    <Button onClick={this.editUsername}>Confirm</Button>
                  </Modal.Footer>
                </Modal>

                {/* modal change address */}
                <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  show={this.state.addressModalShow}
                  centered
                >
                  <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Change Your Address
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      type="text"
                      className="p-2 col-12"
                      placeholder="New Address"
                      onChange={this.handleAddress}
                    ></input>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleToggle}>Close</Button>
                    <Button onClick={this.editAddress}>Confirm</Button>
                  </Modal.Footer>
                </Modal>

                {/* modal change email */}
                <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  show={this.state.emailModalShow}
                  centered
                >
                  <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Change Your Email Address
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      type="text"
                      className="p-2 col-12"
                      placeholder="New Email Address"
                      onChange={this.handleEmail}
                    ></input>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleToggle}>Close</Button>
                    <Button onClick={this.editEmail}>Confirm</Button>
                  </Modal.Footer>
                </Modal>

                {/* modal change phone */}
                <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  show={this.state.phoneModalShow}
                  centered
                >
                  <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Change Your Phone Number
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      type="text"
                      className="p-2 col-12"
                      placeholder="New Phone Number"
                      onChange={this.handlePhone}
                    ></input>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleToggle}>Close</Button>
                    <Button onClick={this.editPhone}>Confirm</Button>
                  </Modal.Footer>
                </Modal>
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
