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
  };
  render() {
    return (
      <div className="HomePage">
        <Header></Header>
        <FotoProfil></FotoProfil>
        <Calendar></Calendar>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(HomePage);
