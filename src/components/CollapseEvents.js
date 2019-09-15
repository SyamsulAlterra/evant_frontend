import React from "react";
import { Link } from "react-router-dom";

class CollapseEvents extends React.Component {
  render() {
    return (
      <div class="card-body">
        Event Name: {this.props.eventName} <br />
        Category: {this.props.category} <br />
        Created by: {this.props.creatorName}
        <div className="button-detail">
          <Link to={"/transition/" + this.props.id.toString()}>
            <button className="btn">See Event Detail</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CollapseEvents;
