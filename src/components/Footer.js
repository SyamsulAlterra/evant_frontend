import React from "react";

class Footer extends React.Component {
  handleClick = () => {
    this.props.handleClick();
  };

  render() {
    return (
      <div className="container footer">
        <div className="row">
          <div className="col bg-info text-center">
            <div className="container mobileView text-left">Evant</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
