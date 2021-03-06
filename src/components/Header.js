import React from "react";
import logo from "../images/imageedit.png";

class Header extends React.Component {
  handleClick = () => {
    this.props.handleClick();
  };

  render() {
    return (
      <div className="container-fluid header bgBiruMuda">
        <div className="row justify-content-center h-100">
          <div className="col-12 text-center pt-2 pb-2 header-style h-100">
            <img src={logo} alt="" height="100%" />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
