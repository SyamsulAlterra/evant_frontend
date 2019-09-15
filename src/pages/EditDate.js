import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FotoProfil from "../components/FotoProfil";
import Axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../Store";
import Calendar from "../components/CalendarPrepareDate";

class HomePage extends React.Component {
  componentWillMount = async () => {
    let config = {
      url: this.props.baseUrl + "date",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    await this.props.setAvailableDatesOnGlobal(response.data);
  };
  render() {
    return (
      <div className="HomePage">
        <Header></Header>
        <Calendar event_id={this.props.match.params.event_id}></Calendar>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(HomePage);
