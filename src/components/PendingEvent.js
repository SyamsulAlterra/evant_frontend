import React from "react";
import { connect } from "unistore/react";
import { actions } from "../Store";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import axios from "axios";
import Header from "./Header";
import ParticipantCard from "./ParticipantCard";
import Footer from "./Footer";
import checked from "../images/checked.png";

class PendingEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      participants: [],
      searchResult: [],
      preference: ""
    };
  }
  formatDate = date => {
    const dateDictionary = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    if (date === undefined) {
      return "halo";
    } else if (date === null) {
      return date;
    }
    let d = date.slice(0, 2);
    let m = parseInt(date.slice(3, 5));
    let y = date.slice(6, 10);
    return `${dateDictionary[m - 1]} ${d}, ${y}`;
  };
  componentWillMount = async () => {
    let config = {
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

    await axios
      .get(
        this.props.baseUrl +
          "events/list_of_participant/" +
          this.props.match.params.id,
        config
      )
      .then(response => {
        let marked = response.data.map(user => {
          let temp = user;
          temp.class = "";
          if (temp.invitation_status === -1) {
            temp.class = "text-danger";
          }
          return temp;
        });
        this.setState({
          participants: marked,
          searchResult: marked
        });
      })
      .catch(error => {
        console.log(error);
      });

    config = {
      url:
        this.props.baseUrl + "users/preferences/" + this.props.match.params.id,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    let response = await Axios(config);
    let myPreferences = response.data.filter(pref => {
      return (
        pref.user_id.toString() === localStorage.getItem("user_id").toString()
      );
    });
    this.setState({ preference: myPreferences[0].preference });
  };
  render() {
    return (
      <div className="eventDetailContent">
        <Header></Header>
        <div className="vh-100 mbForFooter">
          <div className="border container my-3 p-3 mobileView">
            <h1 className="text-center">{this.state.event.event_name}</h1>
            <h6 className="text-center m-0">
              ======================<br></br>
              creator: @{this.state.event.creator_username}
              <br></br>
              category :{this.state.event.category}
            </h6>
            <div className="row justify-content-center mb-0">
              <div className="preferenceSelect col-10 text-center">
                <label for="preference"></label>
                <span>Your preference: {this.state.preference}</span>
              </div>
            </div>
            <div className="dateSection text-center">
              Range date :{" "}
              {this.formatDate(this.state.event.start_date_parameter)} -{" "}
              {this.formatDate(this.state.event.end_date_parameter)}
              <br />
              Event Duration : {this.state.event.duration} days
            </div>
            <div className="row justify-content-center">
              <div className="search-user col-12 text-center my-3">
                <input
                  type="text"
                  placeholder="search username or fullname"
                  className="my-0 w-100 text-center"
                  onChange={this.search}
                ></input>
              </div>
            </div>
            <div className="participant border border-secondary p-3">
              {this.state.searchResult.map((value, index) => {
                return (
                  <ParticipantCard
                    user={value}
                    class={value.class}
                  ></ParticipantCard>
                );
              })}
            </div>
            <div className="container text-center">
              <div className="row text-center">
                <Link to="/events" className="col-12 text-center">
                  <img
                    alt=""
                    src={checked}
                    className="checked m-3 text-center"
                  ></img>
                  <br></br>
                  Ok
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(withRouter(PendingEvent));
