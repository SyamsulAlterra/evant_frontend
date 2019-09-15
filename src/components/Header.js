import React from "react";

class Header extends React.Component {
  handleClick = () => {
    this.props.handleClick();
  };

  render() {
    return (
      <div className="container-fluid header">
        <div className="row justify-content-center">
          <div className="col bg-info text-center pt-2 pb-2 "></div>
          <div className="col-3 bg-white text-left pt-2 pb-2 header-style">
            <h4>Evant</h4>
          </div>
          <div className="col bg-info text-center pt-2 pb-2"></div>
        </div>
      </div>
    );
  }
}

export default Header;
