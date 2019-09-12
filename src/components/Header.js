import React from "react";

class Header extends React.Component {
  handleClick = () => {
    this.props.handleClick();
  };

  render() {
    return (
      <div className="container header">
        <div className="row">
          <div className="col bg-info text-center">Evant</div>
        </div>
      </div>
    );
  }
}

export default Header;
