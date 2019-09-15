import React from "react";
import houseIcon from "../images/house.png";
import calendar from "../images/calendar.png";
import invitation from "../images/invitation.png";
import profile from "../images/profile.png";
import { actions } from "../Store";

import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { connect } from "unistore/react";

class Footer extends React.Component {
  componentDidMount = async (prevProps, prevState) => {
    let config = {
      url: this.props.baseUrl + "invitations",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    await this.props.setInvitationsOnGlobal(response.data);
  };

  render() {
    return (
      <div className="container-fluid footer bg-info text-center p-0">
        <div className="bg-info container mobileView text-center">
          <div className="row mobileView p-0">
            <div className="col-3 bg-info text-center p-0">
              <Link to="/home">
                <img alt="" className="my-3" src={houseIcon}></img>
              </Link>
            </div>
            <div className="col-3 bg-info text-center p-0">
              <Link to="/events">
                <img alt="" className="my-3" src={calendar}></img>
              </Link>
            </div>
            <div className="col-3 bg-info text-center p-0">
              <Link to="/invitations">
                <img alt="" className="my-3" src={invitation}></img>
                <span className="text-dark">
                  {this.props.invitations.length}
                </span>
              </Link>
            </div>
            <div className="col-3 bg-info text-center p-0">
              <Link to="/profile">
                <img alt="" className="my-3" src={profile}></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "baseUrl, invitations",
  actions
)(withRouter(Footer));
