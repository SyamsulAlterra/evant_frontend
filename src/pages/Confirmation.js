import React from "react";
import { connect } from "unistore/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Axios from "axios";
import avatar from "../images/avatar.png";
import checked from "../images/checked.png";
import error from "../images/error.png";
import { Link, withRouter } from "react-router-dom";
import { actions } from "../Store";

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        event_name: "",
        creator_name: ""
      },
      participant: []
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
    // get event
    let config = {
      url:
        this.props.baseUrl + "events/" + this.props.match.params.id.toString(),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    await this.setState({ event: response.data });

    //get participant
    config = {
      url:
        this.props.baseUrl +
        "events/list_of_participant/" +
        this.props.match.params.id.toString(),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    response = await Axios(config);
    await this.setState({ participant: response.data });

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
    let confirmParticipant = response.data.filter(user => {
      return user.confirmation === 1;
    });
    await this.setState({ participant: confirmParticipant });
  };
  confirm = async status => {
    let config = {
      url:
        this.props.baseUrl +
        "users/preferences/confirmations/" +
        this.props.match.params.id.toString(),
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      data: {
        confirmation: status
      }
    };

    await Axios(config);

    if (status === -1) {
      config = {
        url:
          this.props.baseUrl +
          "invitations/decline/" +
          this.props.match.params.id.toString(),
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };

      await Axios(config);
    } else {
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
    }

    config = {
      url: this.props.baseUrl + "events/booked",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    await this.props.setEventsAndBookedDatesOnGlobal(
      response.data.booked_event,
      response.data.all_booked_dates
    );
  };

  render() {
    return (
      <div className="eventHistory pb-5">
        <Header></Header>
        <div className="container mobileView">
          <h3 className="text-center m-0 mt-3">
            {this.state.event.event_name}
          </h3>
          <p className="text-center m-0">===========================</p>
          <h6 className="text-center m-0">
            creator: @{this.state.event.creator_username}
          </h6>
          <h6 className="text-center m-0">
            category: {this.state.event.category}
          </h6>
          <h6 className="text-center m-0">
            date: {this.formatDate(this.state.event.start_date)} -{" "}
            {this.formatDate(this.state.event.end_date)}
          </h6>
          <div className="participant m-3 border">
            {this.state.participant.map((user, index) => {
              return (
                <div className="mx-5 my-2">
                  <table>
                    <tr>
                      <td className="p-2 w-25">
                        <img src={avatar} alt="" className="avatar"></img>
                      </td>
                      <td className="p-2 w-75">
                        <p className="m-0">{user.fullname}</p>
                        <p className="m-0">@{user.username}</p>
                      </td>
                    </tr>
                  </table>
                </div>
              );
            })}
          </div>
          <div className="category">
            <h3 className="text-center">Venue:</h3>
          </div>
          <div className="text-center mb-3">
            <table className="border m-3">
              <div className="m-3">
                <tr>
                  <td className="p-3">
                    <img
                      alt=""
                      src={this.state.event.place_image}
                      className="venue"
                    ></img>
                    <p className="text-center m-0 centering">
                      {this.state.event.place_name}
                    </p>
                    <br></br>
                    <p className="text-center m-0 centering">
                      {this.state.event.place_location}
                    </p>
                  </td>
                </tr>
              </div>
            </table>
          </div>
          <div className="row mb-5 mx-5">
            <Link to="/home" className="col-6 text-center">
              <img
                alt=""
                src={error}
                className="cross m-3"
                onClick={() => this.confirm(-1)}
              ></img>
              <br></br>
              Decline
            </Link>
            <Link
              to={`/generated/${this.props.match.params.id}`}
              className="col-6 text-center"
              onClick={() => this.confirm(1)}
            >
              <img alt="" src={checked} className="checked m-3"></img>
              <br></br>
              Ok
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "baseUrl, allBookedDates",
  actions
)(withRouter(Confirmation));