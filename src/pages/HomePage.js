import React from "react";
import CalendarPage from "./CalendarPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CalendarDetail from "../components/CalendarDetail";
import FotoProfil from "../components/FotoProfil";
import Axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../Store";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableDates: []
    };
  }

  componentDidMount = async () => {
    let config = {
      url: this.props.baseUrl + "date",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    await this.setState({ availableDates: response.data });
  };
  render() {
    return (
      <div className="HomePage">
        <Header></Header>
        <FotoProfil></FotoProfil>
        <CalendarPage availableDates={this.state.availableDates}></CalendarPage>
        <CalendarDetail
          availableDates={this.state.availableDates}
        ></CalendarDetail>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(HomePage);
