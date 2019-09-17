import React from "react";
import fotoProfil from "../images/users.png";
import plus from "../images/plus.png";
import { Link, withRouter } from "react-router-dom";

class FotoProfil extends React.Component {
  render() {
    return (
      <div className="container mobileView p-0 fotoProfil">
        <div className="row mt-3 mx-3">
          <div className="col-3 p-0">
            <img className="my-2 marginLeft" src={fotoProfil} alt=""></img>
          </div>
          <div className="col-6 p-0">
            <div className="row mt-2 justify-content-center">
              <div className="fontstyle text-center">
                <span className="px-2">{localStorage.getItem("fullname")}</span>
                <br></br>
                <span className="px-2">@{localStorage.getItem("username")}</span>
              </div>
              <br></br>
            </div>
          </div >
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
