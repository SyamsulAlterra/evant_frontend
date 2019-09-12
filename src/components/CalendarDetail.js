import React from "react";

class CalendarDetail extends React.Component {
  render() {
    return (
      <div className="container mobileView p-0 text-center">
        <div className="calendarDetail border my-3 text-left p-2">
          <div className="row">
            <div className="col-4 px-3 eventDetail">
              <div className="btn btn-danger mb-2"></div>
              {[...Array(20).keys()].map(data => {
                return (
                  <p className="m-0 eventDetail">{`${data}: judul acara`}</p>
                );
              })}
            </div>
            <div className="col-4 px-3 eventDetail">
              <div className="btn btn-success mb-2"></div>
              {[...Array(20).keys()].map(data => {
                return (
                  <p className="m-0 eventDetail">{`${data}: judul acara`}</p>
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
