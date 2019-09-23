import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../Store";
import axios from "axios";
import loading from "../images/googlecalendar.gif";

class LoadingGenerate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: []
    };
  }

  componentDidMount = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    await axios
      .get(this.props.baseUrl + "events/" + this.props.match.params.id, config)
      .then(response => {
        this.setState({ event: response.data });
      })
      .catch(error => {
        console.log(error);
      });

    let generateDate = {
      url:
        this.props.baseUrl +
        "events/generate_date/" +
        this.props.match.params.id,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let dateResponse = await axios(generateDate);
    console.log(dateResponse.data);

    let generatePlace = {
      url:
        this.props.baseUrl +
        "recommendation/" +
        this.state.event.category +
        "/" +
        this.props.match.params.id,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let placeResponse = await axios(generatePlace);

    await this.props.setPlaceOnGlobal(placeResponse.data);

    this.props.history.push(`/transition/${this.state.event.event_id}`);
  };

  render() {
    return (
      <div className="row justify-content-center">
        <img src={loading} className="text-center" />
      </div>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(withRouter(LoadingGenerate));
