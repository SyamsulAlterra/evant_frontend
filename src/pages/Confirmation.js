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
import firebase from "firebase";
import ParticipantCard from "../components/ParticipantCard";

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        event_name: "",
        creator_name: "",
        category: "eat"
      },
      participant: [],
      fullParticipant: [],
      photoUrl: ""
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
    await this.setState({ fullParticipant: response.data });

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
    let confirmParticipant = await response.data.map(user => {
      let temp = user;
      if (temp.confirmation === 1) {
        temp.class = "text-success";
        return temp;
      } else if (temp.confirmation === -1) {
        temp.class = "text-danger";
        return temp;
      } else {
        temp.class = "";
        return temp;
      }
    });
    console.log(confirmParticipant);
    await this.setState({ participant: confirmParticipant });
    console.log(this.state.participant, this.state.fullParticipant);

    let url = await firebase
      .storage()
      .ref(`places/${this.state.event.place_name}`)
      .getDownloadURL();

    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function(event) {
      const blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();

    console.log(xhr.response);

    // Or inserted into an <img> element:
    // const img = document.getElementById("myimg");
    // img.src = url;

    // await this.setState({ photoUrl: url });
    // console.log(this.state.photoUrl);
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
      if (
        this.state.event.creator_id.toString() ===
        localStorage.getItem("user_id").toString()
      ) {
        config = {
          url:
            this.props.baseUrl +
            "events/" +
            this.props.match.params.id.toString(),
          method: "put",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          data: {
            creator_confirmation: 0
          }
        };

        await Axios(config);
      } else {
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
      }
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

    this.props.history.push("/home");
  };

  render() {
    return (
      <div className="eventHistory pb-5">
        <Header></Header>
        <div className="container mobileView">
          <h3 className="text-center m-0 mt-3">
            {this.state.event.event_name}
          </h3>
          <hr />
          <h6 className="text-center m-0">
            creator: <b>@{this.state.event.creator_username}</b>
          </h6>
          <h6 className="text-center m-0">
            Category: {this.props.verboseCategory[this.state.event.category]}
          </h6>
          <h6 className="text-center m-0">
            date:{" "}
            <b>
              {this.formatDate(this.state.event.start_date)} -{" "}
              {this.formatDate(this.state.event.end_date)}
            </b>
          </h6>
          <div className="participant m-3 rounded shadow">
            {this.state.participant.map((value, index) => {
              return (
                <ParticipantCard
                  user={value}
                  class={value.class}
                ></ParticipantCard>
                // <div className={`mx-3 my-2 ${user.class}`}>
                //   <table>
                //     <tr>
                //       <td className="p-2 w-25">
                //         <img src={avatar} alt="" className="avatar"></img>
                //       </td>
                //       <td className="p-2 w-75">
                //         <p className="m-0">{user.fullname}</p>
                //         <p className="m-0">@{user.username}</p>
                //       </td>
                //     </tr>
                //   </table>
                // </div>
              );
            })}
          </div>
          <div className="category">
            <h3 className="text-center">Venue:</h3>
          </div>
          <div className="text-center mb-3">
            <table className="shadow m-3 border rounded">
              <div className="m-3">
                <tr>
                  <td className="p-3">
                    <img
                      alt=""
                      src={this.state.photoUrl}
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
            {/* decline button */}
            <div className="col-6 text-center">
              <img
                alt=""
                src={error}
                className="cross m-3"
                data-toggle="modal"
                data-target="#decline"
              ></img>
              <br></br>
              Decline
            </div>

            {/* confirm button */}
            <div
              className="col-6 text-center"
              data-toggle="modal"
              data-target="#commit"
            >
              <img alt="" src={checked} className="checked m-3"></img>
              <br></br>
              Commit
            </div>

            {/* modal decline */}
            <div>
              <div
                class="modal fade"
                id="decline"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        <b>Are you sure want to decline?</b>
                      </h5>
                    </div>
                    <div class="modal-body">
                      <p>
                        After you decline, you <b>can't see</b> any activity
                        from this event
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <Link
                        to="/home"
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                        onClick={() => this.confirm(-1)}
                      >
                        Yes
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* modal confirm */}
            <div>
              <div
                class="modal fade"
                id="commit"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        <b>WARNING</b>
                      </h5>
                    </div>
                    <div class="modal-body">
                      <p>
                        <b>Commit</b> will inform to everybody that you{" "}
                        <b>certainly attend the event</b>. However, you{" "}
                        <b>can't decline</b> after commit and your date will{" "}
                        <b>always be marked red</b>
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <Link
                        to="/home"
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                        onClick={() => this.confirm(1)}
                      >
                        Yes
                      </Link>
                    </div>
                  </div>
                </div>
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
  "baseUrl, allBookedDates, verboseCategory, participants",
  actions
)(withRouter(Confirmation));
