import React from "react";
import { Link } from "react-router-dom";
import { connect } from "unistore/react";
import axios from "axios";
import searchFriends from "../images/searchFriends.png";
import ParticipantCard from "../components/ParticipantCard";

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      participants: [],
      preference: "",
      preferenceOptions: []
    };
  }

  componentDidMount = async () => {
    const config = {
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
        this.setState({ participants: response.data });
      })
      .catch(error => {
        console.log(error);
      });

    let getPreference = {
      url: this.props.baseUrl + 'category',
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      params: {
        category: this.state.event.category
      }
    }

    let responsePreference = await axios(getPreference)
    console.log(responsePreference.data)
    this.setState({ preferenceOptions: responsePreference.data })

    let postPreference = {
      url: this.props.baseUrl + 'users/preferences',
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      data: {
        event_id: this.props.match.params.id,
        preference: "Bogor"
      }
    }

    let postResponse = await axios(postPreference)
    console.log(postResponse.data)
  };

  handlePreference = async e => {
    await this.setState({ preference: e.target.value });

    let putPreference = {
      url: this.props.baseUrl + 'users/preferences/' + this.props.match.params.id,
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      data: {
        preference: this.state.preference
      }
    }

    let putResponse = await axios(putPreference)
    console.log(putResponse.data)
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

  render() {
    return (
      <div className="eventDetailContent">
        <div className="border container my-3 p-3 mobileView">
          <h1 className="text-center">{this.state.event.event_name}</h1>

          <h6 className="text-center m-0">creator: {this.state.event.creator_username}</h6>
          <div className="category my-3">
            <h6 className="text-center">
              Category :{this.state.event.category}
            </h6>
          </div>
          <div className="row justify-content-center mb-3">
            <div className="preferenceSelect col-8 text-center">
              <label for="preference"></label>
              <span>
                <select
                  className="form-control"
                  id="preference"
                  onChange={this.handlePreference}
                >
                  {this.state.preferenceOptions.map((value, index) => {
                    return (
                      <option value={value.preference}>
                        {value.preference}
                      </option>
                    )
                  })}
                </select>
              </span>
            </div>
          </div>
          <div className="dateSection text-center">
            Range date :{" "}
            {this.formatDate(this.state.event.start_date_parameter)} -{" "}
            {this.formatDate(this.state.event.end_date_parameter)}
            <br />
            Event Duration : {this.state.event.duration} days
          </div>
          <div className="row justify-content-center mb-3">
            <div className="button-add col-8 text-center">
              <Link to="/#">
                <button className="btn btn-primary m-1">
                  Suggest Our Event
                </button>
              </Link>
            </div >
          </div >
          <div className="row justify-content-center">
            <div className="search-user text-center">
              <input
                type="text"
                placeholder="search by username"
                className="text-center my-3"
              ></input>
              <img className="searchFriends mx-2" alt="" src={searchFriends}></img>
            </div>
          </div>
          <div className="participant border border-secondary p-3">
            {this.state.participants.map((value, index) => {
              return (

                <ParticipantCard user={value}></ParticipantCard>
              );
            })}
          </div>
        </div>
      </div >
    );
  }
}

export default connect("baseUrl, eventName")(EventDetails);
