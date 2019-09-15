import React from "react";

class Button extends React.Component {
  handleClick = () => {
    this.props.handleClick();
  };

  render() {
    return (
      <button className="btn m-0" onClick={this.handleClick}>
        {this.props.buttonName}
      </button>
    );
  }
}

export default Button;
