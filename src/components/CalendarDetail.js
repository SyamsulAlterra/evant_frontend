import React from "react";

class CalendarDetail extends React.Component {
  formatDate = date => {
    const dateDictionary = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let d = date.slice(0, 2);
    let m = parseInt(date.slice(3, 5));
    let y = date.slice(6, 10);
    return `${dateDictionary[m - 1]} ${d}, ${y}`;
  };

  render() {
    return (
      <div className="container mobileView p-0 text-center">
        <div className="calendarDetail border my-3 text-left p-2">
          <div className="row">
            <div className="col-4 px-3 eventDetail">
              <div className="btn btn-danger mb-2"></div>
              {this.props.availableDates.map(data => {
                return (
                  <div>
                    <p className="m-0 eventDetail">judul</p>
                    <p className="m-0 eventDetail">{this.formatDate(data)}:</p>
                    <br></br>
                  </div>
                );
              })}
            </div>
            <div className="col-4 px-3 eventDetail">
              <div className="btn btn-success mb-2"></div>
              {this.props.availableDates.map(data => {
                return (
                  <p className="m-0 eventDetail">{this.formatDate(data)}</p>
                );
              })}
            </div>
            <div className="col-4 px-3 eventDetail">
              <div className="btn btn-warning mb-2"></div>
              <p className="eventDetail">Today</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CalendarDetail;
