import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FotoProfil from "../components/FotoProfil";
import Axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../Store";
import Calendar from "../components/Calendar";

class HomePage extends React.Component {
  state = { display: false };
  componentWillMount = async () => {
    this.setState({ display: true });
    let config = {
      url: this.props.baseUrl + "date",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    await this.props.setAvailableDatesOnGlobal(response.data);

    config = {
      url: this.props.baseUrl + "events/booked",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    response = await Axios(config);
    await this.props.setEventsAndBookedDatesOnGlobal(
      response.data.booked_event,
      response.data.all_booked_dates
    );

    this.props.allBookedDates.map(async date => {
      config = {
        url: this.props.baseUrl + "date",
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        data: {
          date: date
        }
      };

      await Axios(config);
    });
  };
  render() {
    return (
      <div className="HomePage mbForFooter">
        <Header />
        <FotoProfil></FotoProfil>
        <Calendar></Calendar>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(
  "baseUrl, allBookedDates",
  actions
)(HomePage);
