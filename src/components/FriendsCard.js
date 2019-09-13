import React from "react";
import avatar from "../images/avatar.png";
import addFriend from "../images/addFriend.png";
import Axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../Store";
import { withRouter } from "react-router-dom";

class FriendsCard extends React.Component {
  addFriend = input => {
    console.log(input);
    this.props.setParticipantsOnGlobal(input);
    this.props.history.push("/events/create");
    // console.log(this.props.user);
    // let config = {
    //   url: this.props.baseUrl + "invitations",
    //   method: "post",
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token")
    //   },
    //   data: {
    //     invited_id: this.props.user.user_id
    //   }
    // };

    // let response = await Axios(config);
    // console.log(response.data);
  };
  render() {
    return (
      <div className="invitationCard">
        <div class="card my-2 centering">
          <div class="card-body p-2">
            <div class="row">
              <div className="col-2 p-0">
                <img alt="" src={avatar} className="m-1 avatar"></img>
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
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(withRouter(FriendsCard));
