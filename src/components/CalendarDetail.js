import React from "react";
import { connect } from "unistore/react";
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

  componentDidMount = async () => {
    let config = {
      url: this.props.baseUrl + "events/booked",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    this.setState({ events: response.data });
  };

  render() {
    return (
      <div className="container mobileView p-0 text-center">
        <div className="calendarDetail border mb-3 my-1 text-left p-2">
          <div className="row">
            <div className="col-5 px-3 eventDetail">
              <div className="btn btn-success mb-2"></div>
              {this.props.availableDates.map(data => {
                return (
                  <div>
                    <p className="m-0 eventDetail">{this.formatDate(data)}</p>
                  </div>
                );
              })}
            </div>
            <div className="col-7 px-3 eventDetail text-center">
              <div className="btn btn-danger mb-2"></div>
              {this.props.events.map(event => {
                return (
                  <div className="m-1 border p-1">
                    <p className="m-0 eventDetail">"{event.event_name}"</p>
                    <p className="m-0 eventDetail">{`${this.formatDate(
                      event.booked[0]
                    )} - ${this.formatDate(
                      event.booked[event.booked.length - 1]
                    )}`}</p>
                  </div>
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
)(CalendarDetail);
