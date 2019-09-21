import React from "react";
import Axios from "axios";
import { connect } from "unistore/react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ParticipantCard from "../components/ParticipantCard";

class GeneratedEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        event_name: "",
        creator_name: ""
      },
      confirmParticipant: [],
      photoUrl: ""
    };
  }

  // to change the date foramt
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
    // to get event data from the database
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

    // to get participant confirmation
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

    await Axios(config).then(response => {
      let confirmUser = response.data.map(user => {
        let temp = user;
        temp.class = "";
        if (temp.confirmation === -1) {
          temp.class = "text-danger";
        } else if (temp.confirmation === 1) {
          temp.class = "text-success";
        }
        return temp;
      });
      console.log(confirmUser);
      this.setState({ confirmParticipant: confirmUser });
    });
  };

  render() {
    return (
      <div className="eventHistory pb-5">
        <Header />
        <div className="vh-100 mbForFooter">
          <div className="container mobileView generatedEvent">
            {/* container generated event */}
            <div class="row justify-content-center">
              <div className="col-12 text-center">
                <h3 className="text-center m-0 mt-3">You have commited to</h3>
                <h3 className="text-center m-0 mt-3">
                  "{this.state.event.event_name}"
                </h3>
                <hr />
              </div>
              <div className="col-12 text-center generatedEventInfo my-2">
                <h6 className="text-center m-0">
                  creator: <b>@{this.state.event.creator_username}</b>
                </h6>
                <br />
                <h6 className="text-center m-0">
                  category: {this.state.event.category}
                </h6>
                <br />
                <h6 className="text-center m-0">
                  date:{" "}
                  <b>
                    {this.formatDate(this.state.event.start_date)} -{" "}
                    {this.formatDate(this.state.event.end_date)}
                  </b>
                </h6>
              </div>
              <h3 className="text-center mt-3">Participants</h3>
              {/* to show list of participants */}
              <div className="col-12 generatedParticipant m-3 rounded">
                {this.state.confirmParticipant.map((value, index) => {
                  return <ParticipantCard user={value} class={value.class} />;
                })}
              </div>
              <div className="category">
                <h3 className="text-center">Venue:</h3>
              </div>
              <div className="text-center mb-3">
                <table className="border shadow rounded m-3">
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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect("baseUrl")(withRouter(GeneratedEvent));
