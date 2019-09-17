import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../Store";
import Header from "./Header";
import Footer from "./Footer";
import Axios from "axios";

class Unmatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      place: null
    };
  }
  componentWillMount = async () => {
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

    config = {
      url: this.props.baseUrl + "events/" + this.props.match.params.id,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    console.log(config.url);

    let response = await Axios(config);
    this.setState({
      place: response.data.place_name,
      date: response.data.start_date
    });
  };
  render() {
    console.log(this.state);
    if (this.state.date === null) {
      return (
        <div>
          <Header></Header>
          Sorry, your schedule don't have match for this event
          <Footer></Footer>
        </div>
      );
    } else if (this.state.place === null) {
      return (
        <div>
          <Header></Header>
          Sorry, We couldn't find suitable place for you
          <Footer></Footer>
        </div>
      );
    }
  }
}

export default connect(
  "baseUrl",
  actions
)(withRouter(Unmatch));
