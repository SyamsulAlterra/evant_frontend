import React from "react";
import { Link } from "react-router-dom";

class CollapseEvents extends React.Component {
  render() {
    console.log(this.props.id);
    return (
      <div className="col-8 text-center my-3 border shadow p-3 rounded">
        Event Name: {this.props.eventName} <br />
        <br />
        Category: {this.props.category} <br />
        <br />
        Created by: {this.props.creatorName}
        <br />
        <br />
        <div className="button-detail">
          <Link to={"/transition/" + this.props.id.toString()}>
            <button className="btn eventDetailButton">See Event Detail</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CollapseEvents;
