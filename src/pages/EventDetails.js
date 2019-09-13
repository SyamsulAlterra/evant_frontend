import React from "react";
import { connect } from "unistore/react";
import axios from "axios";

class EventDetails extends React.Component {
  render() {
    return (
      <div className="eventDetailContent">
        <h1 className="text-center">Event Name</h1>
        <h6 className="text-center">event creator:</h6>
        <div className="participant">
          {[...Array(5).keys()].map((value, index) => {
            return (
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 border">Participant #{index}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="category">
          <h3 className="text-center">Category</h3>
        </div>
        <div className="preferenceSelect text-center">preference</div>
        <div className="dateSection text-center">
          Range date: <br />
          Event Duration:
        </div>
      </div>
    );
  }
}

export default connect("baseUrl")(EventDetails);
