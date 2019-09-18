import React from "react";
import { connect } from "unistore/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Axios from "axios";
import avatar from "../images/avatar.png";
import { Link, withRouter } from "react-router-dom";
import testImage from "../images/error.png";

class GeneratedEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        event_name: "",
        creator_name: ""
      },
      confirmParticipant: []
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

    //get participant confirmation
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
    let confirmUser = response.data.filter(user => {
      let temp = user;
      temp.class = "";
      if (temp.confirmation === -1) {
        temp.class = "bg-danger";
      }
      return temp;
    });
    console.log(confirmUser);
    await this.setState({ confirmParticipant: confirmUser });
  };

  render() {
    return (
      <div className="eventHistory pb-5">
        <Header></Header>
        <div className="vh-100 mbForFooter">
          <div className="container mobileView generatedEvent">
            <div class="row justify-content-center">
              <div className="col-12 text-center">
                <h2 className="text-center m-0 mt-3">You are commit to</h2>
                <h3 className="text-center m-0 mt-3">
                  "{this.state.event.event_name}"
                </h3>
                <hr />
              </div>
              <div className="col-12 text-center generatedEventInfo my-2">
                <h6 className="text-center m-0">
                  creator: @{this.state.event.creator_username}
                </h6>
                <br />
                <h6 className="text-center m-0">
                  category: {this.state.event.category}
                </h6>
                <br />
                <h6 className="text-center m-0">
                  date: {this.formatDate(this.state.event.start_date)} -{" "}
                  {this.formatDate(this.state.event.end_date)}
                </h6>
              </div>
              <h3 className="text-center mt-3">Participants</h3>

              <div className="col-8 generatedParticipant m-3 border rounded shadow">
                {this.state.confirmParticipant.map((user, index) => {
                  console.log(user);
                  return (
                    <div className={`mx-5 my-2 ${user.class}`}>
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
                          // src={this.state.event.place_image}
                          src={testImage}
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
        <Footer></Footer>
      </div>
    );
  }
}

export default connect("baseUrl")(withRouter(GeneratedEvent));
