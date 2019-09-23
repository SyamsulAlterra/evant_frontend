import React from "react";
import { Link, withRouter } from "react-router-dom";
import fotoProfil from "../images/manager.png";
import plus from "../images/clipboard.png";

class FotoProfil extends React.Component {
  render() {
    return (
      <div className="container mobileView p-0 fotoProfil animated fadeIn">
        <div className="row mt-3 mx-3">
          {/* check if the user has already a profile picture or not */}
          <div className="col-3 p-0">
            {[1].map(dummy => {
              if (this.props.photo === null) {
                return (
                  <img src={fotoProfil} className="my-2 marginLeft" alt="" />
                );
              } else {
                return (
                  <img
                    src={this.props.photo}
                    className="my-2 marginLeft"
                    alt=""
                  />
                );
              }
            })}
          </div>
          <div className="col-6 p-0">
            <div className="row mt-1 px-2">
              <div className="fontstyle text-left">
                <span className="px-2 span1">
                  {localStorage.getItem("fullname").split(" ")[0]}
                </span>
                <br></br>
                <span className="px-2 span2">
                  @{localStorage.getItem("username")}
                </span>
              </div>
              <br></br>
            </div>
          </div>
          {/* button to crate new events */}
          <div className="col-3 p-0 text-center fontstyle boarding-create-event">
            <Link to="/events/create">
              <img src={plus} alt="" className="text-center mt-2"></img>
              <p className="m-0 text-center plain">create</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FotoProfil);
