import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../Store";
import Axios from "axios";

class Transition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: ""
    };
  }
  componentDidMount = async () => {
    let currentUserId = localStorage.getItem("user_id").toString();
    let config = {
      url:
        this.props.baseUrl + "events/" + this.props.match.params.id.toString(),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    let response = await Axios(config);
    console.log(response.data);
    let event_id = response.data.event_id;
    let event_status = response.data.status;
    let creator_id = response.data.creator_id;
    let place = response.data.place_name;
    this.setState({ place: response.data.place_name });

    config = {
      url:
        this.props.baseUrl +
        "users/preferences/" +
        this.props.match.params.id.toString(),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    response = await Axios(config);
    console.log(response.data);
    let isFilled = response.data.filter(pref => {
      return pref.user_id.toString() === currentUserId;
    });
    console.log(place);
    let destination;
    if (event_status === 0) {
      if (place !== "") {
        destination = `/confirmation/${event_id}`;
      } else if (currentUserId === creator_id.toString()) {
        destination = `/events/${event_id}`;
      } else if (isFilled.length > 0) {
        destination = `/pending/${event_id}`;
      } else {
        destination = `/participant/${event_id}`;
      }
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
