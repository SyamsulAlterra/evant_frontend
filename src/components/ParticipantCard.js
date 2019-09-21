import React from "react";
import axios from "axios";
import firebase from "firebase";
import { connect } from "unistore/react";
import { withRouter } from "react-router-dom";
import avatar from "../images/manager.png";
import crown from "../images/crown.png";
import check from "../images/check.png";
import { actions } from "../Store";

class ParticipantCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preferences: [],
      userPreference: "",
      photo: ""
    };
  }
  componentWillMount = async () => {
    // to check if user have filled their preference
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    await axios
      .get(
        this.props.baseUrl + "users/preferences/" + this.props.match.params.id,
        config
      )
      .then(response => {
        this.setState({ preferences: response.data });
      })
      .catch(error => {
        console.log(error);
      });

    let checkPreference = this.state.preferences.filter(preference => {
      return preference.user_id === this.props.user.id_participant;
    });
    await this.setState({ userPreference: checkPreference });

    // to display profile picture in the participant list
    await firebase
      .storage()
      .ref(`profile_pictures/${this.props.user.username}`)
      .getDownloadURL()
      .then(url => {
        this.setState({ photo: url });
      })
      .catch(() => {
        this.setState({ photo: "" });
      });
  };
  render() {
    // to mark if user is the creator of the event
    if (this.props.user.status === "creator") {
      return (
        <div className={`invitationCard`}>
          <div class={`card my-2 centering ${this.props.class}`}>
            <div class="card-body shadow p-2">
              <div className="container">
                <div class="row">
                  <div className="col-2 p-0">
                    {[1].map(dummy => {
                      // check if user has profile picture or not
                      if (this.state.photo === "") {
                        return (
                          <img alt="" src={avatar} className="m-1 avatar"></img>
                        );
                      } else {
                        return (
                          <img
                            alt=""
                            src={this.state.photo}
                            className="m-1 avatar"
                          ></img>
                        );
                      }
                    })}
                  </div>
                  <div className="col-8 p-0">
                    <p class="m-0 text-left">{this.props.user.fullname}</p>
                    <p class="m-0 text-left">@{this.props.user.username}</p>
                  </div>
                  <div className="col-2 p-0">
                    <img alt="" src={crown} className="m-1 avatar"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      if (this.state.userPreference.length === 0) {
        return (
          <div className={`invitationCard`}>
            <div class={`card my-2 centering ${this.props.class}`}>
              <div class="card-body shadow p-2">
                <div className="container">
                  <div class="row">
                    <div className="col-2 p-0">
                      {[1].map(dummy => {
                        if (this.state.photo === "") {
                          return (
                            <img
                              alt=""
                              src={avatar}
                              className="m-1 avatar"
                            ></img>
                          );
                        } else {
                          return (
                            <img
                              alt=""
                              src={this.state.photo}
                              className="m-1 avatar"
                            ></img>
                          );
                        }
                      })}
                    </div>
                    <div className="col-8 p-0">
                      <p class="m-0 text-left">{this.props.user.fullname}</p>
                      <p class="m-0 text-left">@{this.props.user.username}</p>
                    </div>
                    <div className="col-2 p-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className={`invitationCard`}>
            <div class={`card my-2 centering ${this.props.class}`}>
              <div class="card-body p-2">
                <div className="container">
                  <div class="row">
                    <div className="col-2 p-0">
                      {[1].map(dummy => {
                        if (this.state.photo === "") {
                          return (
                            <img
                              alt=""
                              src={avatar}
                              className="m-1 avatar"
                            ></img>
                          );
                        } else {
                          return (
                            <img
                              alt=""
                              src={this.state.photo}
                              className="m-1 avatar"
                            ></img>
                          );
                        }
                      })}
                    </div>
                    <div className="col-8 p-0">
                      <p class="m-0 text-left">{this.props.user.fullname}</p>
                      <p class="m-0 text-left">@{this.props.user.username}</p>
                    </div>
                    <div className="col-2 p-0">
                      <img alt="" src={check} className="m-1 avatar"></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default connect(
  "baseUrl",
  actions
)(withRouter(ParticipantCard));
