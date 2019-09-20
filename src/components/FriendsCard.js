import React from "react";
import avatar from "../images/manager.png";
import addFriend from "../images/addFriend.png";
import { connect } from "unistore/react";
import { actions } from "../Store";
import { withRouter } from "react-router-dom";
import Slide from "react-reveal/Slide";
import firebase from "firebase";

class FriendsCard extends React.Component {
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
      .catch(url => {});
  };
  addFriend = input => {
    this.props.setParticipantsOnGlobal(input);
    this.props.history.push("/events/create");
  };
  render() {
    return (
      <Slide left>
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
                <div className="col-6 p-0">
                  <p class="m-0 text-left">{this.props.user.fullname}</p>
                  <p class="m-0 text-left">@{this.props.user.username}</p>
                </div>
                <div className="col-4 p-0">
                  <img
                    alt=""
                    src={addFriend}
                    className="inviteButton my-2"
                    onClick={() => this.addFriend(this.props.user)}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(withRouter(FriendsCard));
