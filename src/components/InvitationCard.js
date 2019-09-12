import React from "react";

class InvitaionCard extends React.Component {
  render() {
    return (
      <div className="container mobileView invitationCard">
        <div class="row m-2">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">Special title treatment</h6>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary m-2 text-right">
                  Accept
                </a>
                <a href="#" className="btn btn-primary m-2 text-right">
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

export default InvitaionCard;
