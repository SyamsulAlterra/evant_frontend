import React from "react";
import { Link } from "react-router-dom";

class CollapseEvents extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="card-body">
        Event Name: <br />
        Creator: <br />
        Start Date: <br />
        Duration: <br />
        <div className="button-detail">
          <Link to={"/events/" + this.props.id}>
            <button className="btn">See Event Detail</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CollapseEvents;
