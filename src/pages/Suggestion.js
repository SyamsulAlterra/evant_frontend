import React from "react";
import { connect } from "unistore/react";
import Header from "../components/Header";
import Axios from "axios";
import avatar from "../images/avatar.png";
import { actions } from "../Store";
import firebase from "firebase";
// import { storage } from "../firebase/storage";
import ParticipantCard from "../components/ParticipantCard";

class Suggestion extends React.Component {
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
  componentWillMount = async () => {
    let config = {
      url:
        this.props.baseUrl + "events/" + this.props.match.params.id.toString(),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    console.log(this.props.place);
    let response = await Axios(config);
    await this.setState({ event: response.data });
    console.log(response.data);

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

    let generatePlace = {
      url:
        this.props.baseUrl +
        "recommendation/" +
        this.state.event.category +
        "/" +
        this.props.match.params.id,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let placeResponse = await Axios(generatePlace);

    await this.props.setPlaceOnGlobal(placeResponse.data);
    console.log(placeResponse.data);

    response = await Axios(config);
    await this.setState({ participant: response.data });
  };
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
  choosePlace = async input => {
    console.log(input);
    let config = {
      url:
        this.props.baseUrl + "events/" + this.props.match.params.id.toString(),
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      data: {
        place_name: input.place,
        place_location: input.place_location,
        place_image: input.photo
      }
    };

    await Axios(config);
    this.props.history.push("/transition/" + this.props.match.params.id);
  };
  render() {
    return (
      <div className="eventHistory">
        <Header></Header>
        <div className="container mobileView">
          <h3 className="text-center m-0 mt-3">
            {this.state.event.event_name}
          </h3>
          <hr></hr>
          <h6 className="text-center m-0">
            creator: @{this.state.event.creator_username}
          </h6>
          <h6 className="text-center m-0">
            category: {this.state.event.category}
          </h6>
          <h6 className="text-center m-0">
            Suggestion date: <br></br>
            {this.formatDate(this.state.event.start_date)} -{" "}
            {this.formatDate(this.state.event.end_date)}
          </h6>
          <div className="participant m-3">
            {this.state.participant.map((value, index) => {
              return (
                <ParticipantCard
                  user={value}
                  class={value.class}
                ></ParticipantCard>
              );
            })}
          </div>
          <div className="category">
            <h3 className="text-center">Place Suggestions:</h3>
          </div>
          <div className="text-center mb-3 border p-3 places">
            <table className="">
              {this.props.place.map(num => {
                console.log(num);
                return (
                  <div className="m-3 suggestion">
                    <tr>
                      <td className="p-1 border">
                        <img alt="" src={num.photo} className="venue"></img>
                        <p className="text-center m-0 centering suggestion">
                          {num.place}
                        </p>

                        <button
                          className="btn btn-success"
                          onClick={() => this.choosePlace(num)}
                        >
                          Choose
                        </button>
                        <p className="text-center m-0 centering">
                          {num.place_location}
                        </p>
                      </td>
                    </tr>
                  </div>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "baseUrl, place",
  actions
)(Suggestion);
