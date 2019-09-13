import React from "react";
import fotoProfil from "../images/users.png";

class FotoProfil extends React.Component {
  render() {
    return (
      <div className="container mobileView p-0 fotoProfil">
        <div className="row mt-3 mx-3">
          <div className="col-auto p-0">
            <img className="" src={fotoProfil} alt=""></img>
          </div>
          <div className="col-9 p-0">
            <span className="px-2">Muhammad Syamsul Arifin</span>
            <br></br>
            <span className="px-2">@username</span>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default FotoProfil;
