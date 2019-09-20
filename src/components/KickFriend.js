import React from "react";
import avatar from "../images/avatar.png";
import cancel from "../images/cancel.png";
import { connect } from "unistore/react";
import { actions } from "../Store";
import { withRouter } from "react-router-dom";
import firebase from "firebase";

class KickFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: ""
    };
  }

  componentWillMount = async () => {
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
  addFriend = input => {
    console.log(input);
    this.props.setParticipantsOnGlobal(input);
    this.props.history.push("/events/create");
  };
  render() {
    return (
      <div className="invitationCard">
        <div class="card my-2 centering">
          <div class="card-body p-2">
            <div class="row">
              <div className="col-2 p-0">
                {[1].map(dummy => {
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
                <p class="m-0 text-left span2">{this.props.user.fullname}</p>
                <p class="m-0 text-left span2">@{this.props.user.username}</p>
              </div>
              <div className="col-2 p-0">
                <img
                  alt=""
                  src={cancel}
                  className="inviteButton my-2"
                  onClick={() =>
                    this.props.removeParticipantOnGlobal(this.props.user)
                  }
                ></img>
              </div>
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
)(withRouter(KickFriend));
