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
      <div className="container footer bg-info text-center p-0">
        <div className="bg-info container mobileView text-center">
          <div className="row mobileView p-0">
            <div className="col-3 bg-info text-center p-0">
              <Link to="/home">
                <img className="my-3" src={houseIcon}></img>
              </Link>
            </div>
            <div className="col-3 bg-info text-center p-0">
              <Link to="/events">
                <img className="my-3" src={calendar}></img>
              </Link>
            </div>
            <div className="col-3 bg-info text-center p-0">
              <Link to="/invitations">
                <img className="my-3" src={invitation}></img>
              </Link>
            </div>
            <div className="col-3 bg-info text-center p-0">
              <Link to="/profile">
                <img className="my-3" src={profile}></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);
