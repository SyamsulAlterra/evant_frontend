import React from "react";
import houseIcon from "../images/house.png";
import calendar from "../images/calendar.png";
import invitation from "../images/invitation.png";
import profile from "../images/profile.png";

import { Link, withRouter } from "react-router-dom";

class Footer extends React.Component {
  handleClick = () => {
    this.props.handleClick();
  };

  render() {
    return (
      <div className="container footer bg-info">
        <div className="container bg-info mobileView text-center">
          <div className="row">
            <div className="col-3 bg-info text-center">
              <Link to="/home">
                <img className="m-3" src={houseIcon}></img>
              </Link>
            </div>
            <div className="col-3 bg-info text-center">
              <Link to="/event">
                <img className="m-3" src={calendar}></img>
              </Link>
            </div>
            <div className="col-3 bg-info text-center">
              <Link to="/invitations">
                <img className="m-3" src={invitation}></img>
              </Link>
            </div>
            <div className="col-3 bg-info text-center">
              <Link to="/profile">
                <img className="m-3" src={profile}></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);
