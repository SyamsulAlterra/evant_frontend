import React from "react";
import Slide from "react-reveal/Slide";
import { Link } from "react-router-dom";

class CollapseEvents extends React.Component {
  render() {
    console.log(this.props.id);
    return (
      <Slide left>
        <div className="col-12 text-left my-3 border shadow p-3 rounded">
          <div className="text-center">
            <b>{this.props.eventName}</b> <br />
          </div>
          Category: {this.props.category} <br />
          Created by: <b>@{this.props.creatorName}</b>
          <div className="button-detail text-right toEventDetails">
            <Link to={"/transition/" + this.props.id.toString()}>
              <small>See details..</small>
            </Link>
          </div>
        </div>
      </Slide>
    );
  }
}

export default CollapseEvents;
