import React from "react";
import Axios from "axios";
import Slide from "react-reveal/Slide";
import Swal from "sweetalert2";
import { Link, withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../Store";

class InvitationCard extends React.Component {
  // method to decline an invitation
  declineEvent = async input => {
    let config = {
      url: this.props.baseUrl + "invitations/reject/" + input.toString(),
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    await Axios(config)
      .then(response => {
        Swal.fire("Success", "You have rejected this invitation", "success");
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      })
      .catch(error => {
        Swal.fire("Error", "Something Went Wrong, Please Try Again", "error");
      });
  };

  // method to accept an invitation
  acceptEvent = async input => {
    let config = {
      url: this.props.baseUrl + "invitations/accept/" + input.toString(),
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    await Axios(config);
    Swal.fire(
      "Invitation accepted",
      "Please fill your available date and preferences in event detail page",
      "success"
    );
    this.props.history.push("/events");
  };

  render() {
    return (
      <Slide left>
        {/* container list invitations */}
        <div className="container mobileView invitationCard animated fadeIn">
          <div class="row justify-content-center">
            <div class="col-12 my-3 mx-4 text-left">
              <div class="card shadow">
                <div class="card-body shadow">
                  <h6 class="card-title cardInvitation">
                    You have been invited to: <br />
                    <div className="eventNameInvitation text-center">
                      <b>"{this.props.invitation.event_name}"</b>
                    </div>
                  </h6>
                  <p class="card-text textInvitation m-0">
                    Invited by: <b>@{this.props.invitation.username_creator}</b>{" "}
                    <br />
                    Duration: {this.props.invitation.event_duration} day(s){" "}
                    <br />
                    Category:{" "}
                    {
                      this.props.verboseCategory[
                        this.props.invitation.event_category
                      ]
                    }{" "}
                  </p>
                  <div className="text-right invitationAccDec">
                    <Link
                      className="btn m-2 text-right"
                      onClick={() =>
                        this.declineEvent(this.props.invitation.event_id)
                      }
                    >
                      Decline
                    </Link>
                    <Link
                      className="btn m-2 text-right"
                      onClick={() =>
                        this.acceptEvent(this.props.invitation.event_id)
                      }
                    >
                      Accept
                    </Link>
                  </div>
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
  "baseUrl, verboseCategory",
  actions
)(withRouter(InvitationCard));
