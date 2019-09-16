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
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

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
      passwordModalShow: false
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

  handleToggle = () => {
    this.setState({
      usernameModalShow: false,
      addressModalShow: false,
      emailModalShow: false,
      phoneModalShow: false,
      passwordModalShow: false
    });
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
      Swal.fire("Error", "Your New Password Doesn't Match", "warning");
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="profile">
        <div className="container mobileView animated fadeIn">
          <div className="row border shadow">
            <div className="col text-center">
              <div className="fullname">
                <h3 className="my-5">{localStorage.getItem("fullname")}</h3>
              </div>
              <div className="mb-4">
                <img
                  src={fotoProfil}
                  className="profileImage my-3"
                  alt=""
                ></img>
              </div>
              <div className="p-0">
                <div className="username mb-3">
                  <div className="row justify-content-center">
                    <div className="col-10">
                      <img
                        src={username}
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
                          this.setState({ usernameModalShow: true })
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
                          this.setState({ addressModalShow: true })
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
                        onClick={() => this.setState({ emailModalShow: true })}
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
                        onClick={() => this.setState({ phoneModalShow: true })}
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
                    <Button onClick={this.editProfile}>Confirm</Button>
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
                    <Button onClick={this.editProfile}>Confirm</Button>
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
                    <Button onClick={this.editProfile}>Confirm</Button>
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
                    <Button onClick={this.editProfile}>Confirm</Button>
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
