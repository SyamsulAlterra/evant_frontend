import React from "react";
import Footer from "../components/Footer";
import Axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../Store";
import CalendarPrepareDate from "../components/CalendarPrepareDate";

class EditDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    };
  }
  componentWillMount = async () => {
    // to get the event data
    const config = {
      url:
        this.props.baseUrl +
        "events/" +
        this.props.match.params.event_id.toString(),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    this.setState({ event: response.data });
  };

  render() {
    return (
      <div className="EditDate">
        <CalendarPrepareDate
          start_date={this.state.event.start_date_parameter}
          end_date={this.state.event.end_date_parameter}
        ></CalendarPrepareDate>
        <Footer />
      </div>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(EditDate);
