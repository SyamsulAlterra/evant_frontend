import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../Store";
import Axios from "axios";

class Transition extends React.Component {
  componentDidMount = async () => {
    let config = {
      url:
        this.props.baseUrl + "events/" + this.props.match.params.id.toString(),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    let response = await Axios(config);
    let event_id = response.data.event_id;
    let event_status = response.data.status;
    let destination;
    if (event_status === 0) {
      destination = `/events/${event_id}`;
    } else {
      destination = `/history/${event_id}`;
    }
    this.props.history.replace(destination);
    console.log(response.data);
  };

  render() {
    return <div>Please Wait</div>;
  }
}

export default connect(
  "baseUrl",
  actions
)(withRouter(Transition));
