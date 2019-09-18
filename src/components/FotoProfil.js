import React from "react";
import fotoProfil from "../images/manager.png";
import plus from "../images/clipboard.png";
import { Link, withRouter } from "react-router-dom";

class FotoProfil extends React.Component {
  render() {
    return (
      <div className="container mobileView p-0 fotoProfil animated fadeIn">
        <div className="row mt-3 mx-3">
          <div className="col-3 p-0">
            <img className="my-2 marginLeft" src={fotoProfil} alt=""></img>
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
          <div className="col-3 p-0 text-center fontstyle">
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
