import React from "react";

class InvitationCard extends React.Component {
  render() {
    return (
      <div className="container mobileView invitationCard">
        <div class="row m-2">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  You have been invited to "{this.props.invitation.event_name}"
                </h6>
                <p class="card-text">
                  invited by: @{this.props.invitation.username_creator}{" "}
                  <br></br>
                  duration: {this.props.invitation.event_duration} days{" "}
                  <br></br>
                  category: {this.props.invitation.event_category} <br></br>
                </p>
                <a href="/calendar" className="btn btn-primary m-2 text-right">
                  Accept
                </a>
                <a href="/calendar" className="btn btn-primary m-2 text-right">
                  Decline
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvitationCard;
