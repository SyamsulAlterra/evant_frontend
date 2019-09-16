import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../Store";
import Header from "./Header";
import Footer from "./Footer";
import Axios from "axios";

class Unmatch extends React.Component {
  componentDidMount = async () => {
    let config = {
      url: this.props.baseUrl + "events/" + this.props.match.params.id,
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      data: {
        status: 1
      }
    };

    await Axios(config);
  };
  render() {
    return (
      <div>
        <Header></Header>
        Sorry, your schedule don't have match for this event
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(withRouter(Unmatch));
