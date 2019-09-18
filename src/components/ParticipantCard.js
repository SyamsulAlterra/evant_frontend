import React from "react";
import avatar from "../images/avatar.png";
import crown from "../images/crown.png";
import check from "../images/check.png";
import { connect } from "unistore/react";
import { actions } from "../Store";
import { withRouter } from "react-router-dom";
import axios from "axios";

class ParticipantCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preferences: [],
      userPreference: ""
    };
  }
  componentWillMount = async () => {
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
  };
  render() {
    console.log(this.props.class);
    if (this.props.user.status === "creator") {
      return (
        <div className={`invitationCard`}>
          <div class={`card my-2 centering ${this.props.class}`}>
            <div class="card-body shadow p-2">
              <div className="container">
                <div class="row">
                  <div className="col-2 p-0">
                    <img alt="" src={avatar} className="m-1 avatar"></img>
                  </div>
                  <div className="col-6 p-0">
                    <p class="m-0 text-left">{this.props.user.fullname}</p>
                    <p class="m-0 text-left">@{this.props.user.username}</p>
                  </div>
                  <div className="col-4 p-0">
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
              <div class="card-body p-2">
                <div className="container">
                  <div class="row">
                    <div className="col-2 p-0">
                      <img alt="" src={avatar} className="m-1 avatar"></img>
                    </div>
                    <div className="col-6 p-0">
                      <p class="m-0 text-left">{this.props.user.fullname}</p>
                      <p class="m-0 text-left">@{this.props.user.username}</p>
                    </div>
                    <div className="col-4 p-0"></div>
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
                      <img alt="" src={avatar} className="m-1 avatar"></img>
                    </div>
                    <div className="col-6 p-0">
                      <p class="m-0 text-left">{this.props.user.fullname}</p>
                      <p class="m-0 text-left">@{this.props.user.username}</p>
                    </div>
                    <div className="col-4 p-0">
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
