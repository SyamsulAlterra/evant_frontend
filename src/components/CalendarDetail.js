import React from "react";
import { connect } from "unistore/react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";

class CalendarDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }
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
      <div className="container mobileView p-0 text-center mbForFooter">
        <div className="calendarDetail mb-3 my-1 text-left">
          <div className="row no-gutters">
            <div className="col-12 eventDetail text-center">
              <p className="text-center mb-2 p-1 bg-danger text-white markedTitle">
                Marked Event(s)
              </p>
              {this.props.events.map(event => {
                // let theDate = event.booked.filter((date, i) => {
                //   return i === 0;
                // });
                // let month = theDate[0].slice(3, 5);
                // if (month === this.props.selectedMonth) {
                return (
                  <Link to={`/transition/${event.event_id}`}>
                    <div className="m-1 border p-1">
                      <p className="m-0 eventDetail">"{event.event_name}"</p>
                      <p className="m-0 eventDetail">{`${this.formatDate(
                        event.booked[0]
                      )} - ${this.formatDate(
                        event.booked[event.booked.length - 1]
                      )}`}</p>
                    </div>
                  </Link>
                  // );
                  // }
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "availableDates, baseUrl, events",
  connect
)(withRouter(CalendarDetail));
