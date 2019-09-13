import React from "react";
import { withRouter } from "react-router-dom";
import Calendar from "../components/Calendar";
import Axios from "axios";
import { connect } from "unistore/react";

class CalendarPage extends React.Component {
  render() {
    return (
      <div className="container mobileView calendarPage p-0">
        <div className="row no-gutters">
          <div className="col mobileView">
            <Calendar availableDates={this.props.availableDates}></Calendar>
          </div>
        </div>
      </div>
    );
  }
}

export default connect("baseUrl")(withRouter(CalendarPage));
