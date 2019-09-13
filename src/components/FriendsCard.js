import React from "react";
import avatar from "../images/avatar.png";
import addFriend from "../images/addFriend.png";

class FriendsCard extends React.Component {
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
                <img alt="" src={addFriend} className="inviteButton my-2"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendsCard;
