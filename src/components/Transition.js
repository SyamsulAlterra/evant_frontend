import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../Store";
import Axios from "axios";
import loading from "../images/loading.gif";

class Transition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: ""
    };
  }
  componentWillMount = async () => {
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
    let suggestionDate = response.data.start_date;
    let eventPreference = response.data.preference;
    // this.setState({ place: response.data.place_name });

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
    let isFilled = response.data.filter(pref => {
      return pref.user_id.toString() === currentUserId;
    });

    config = {
      url:
        this.props.baseUrl +
        "users/preferences/confirmations/" +
        this.props.match.params.id.toString(),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    response = await Axios(config);
    let isConfirm = response.data.filter(user => {
      return user.user_id.toString() === currentUserId;
    });

    console.log("AAAAAAAAAAAAAAAAAAAA", isConfirm, place);
    console.log(suggestionDate, eventPreference);

    let destination;
    if (event_status === 0) {
      if (
        (suggestionDate === null && eventPreference !== null) ||
        (suggestionDate !== null && eventPreference === null)
      ) {
        destination = `/unmatch/${event_id}`;
      } else if (
        (currentUserId === creator_id.toString() &&
          isConfirm[0] === undefined &&
          place === null) ||
        (currentUserId === creator_id.toString() &&
          isConfirm[0] !== undefined &&
          place === null &&
          suggestionDate === null)
      ) {
        destination = `/creator/${event_id}`;
      } else if (
        suggestionDate !== null &&
        isConfirm[0] !== undefined &&
        currentUserId === creator_id.toString() &&
        place === null
      ) {
        destination = `/suggestion/${event_id}`;
      } else if (isConfirm[0] === undefined) {
        destination = `/participant/${event_id}`;
      } else if (
        isFilled.length > 0 &&
        (place === null || place === "") &&
        currentUserId !== creator_id.toString()
      ) {
        destination = `/pending/${event_id}`;
      } else if (isConfirm[0].confirmation === 1 && place !== null) {
        destination = `/generated/${event_id}`;
      } else if (isConfirm[0].confirmation === 0 && place !== null) {
        destination = `/confirmation/${event_id}`;
      }
    } else {
      destination = `/history/${event_id}`;
    }
    this.props.history.replace(destination);
    console.log(response.data);
  };

  render() {
    return (
      <div className="row justify-content-center">
        <img src={loading} alt="" className="text-center w-100 h-100" />
      </div>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(withRouter(Transition));
