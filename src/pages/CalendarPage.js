import React from "react";
import { withRouter } from "react-router-dom";
import Calendar from "../components/Calendar";

class CalendarPage extends React.Component {
  render() {
    return (
      <div className="container mobileView calendarPage p-0">
        <div className="row no-gutters">
          <div className="col mobileView">
            <Calendar></Calendar>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CalendarPage);
