import React from "react";

class CalendarCell extends React.Component {
  handleClick = input => {
    console.log(input);
  };

  render() {
    if (this.props.value === this.props.todayDate) {
      return (
        <div
          className="calendarCell border text-right m-2 px-0"
          onClick={() => this.handleClick(this.props.value)}
        >
          <p className="px-2 m-0 calendarCell">{this.props.value}</p>
        </div>
      );
    } else {
      return (
        <div
          className="calendarCell border text-right m-0 px-0"
          onClick={() => this.handleClick(this.props.value)}
        >
          <p className="px-2 m-0 calendarCell">{this.props.value}</p>
        </div>
      );
    }
  }
}

export default CalendarCell;
