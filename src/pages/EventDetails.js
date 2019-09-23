import React from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../Store";
import ParticipantCard from "../components/ParticipantCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      participants: [],
      searchParticipants: [],
      preference: "",
      preferenceOptions: []
    };
  }

  componentWillMount = async () => {
    // get event detail data
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

    // get participants of the event
    await axios
      .get(
        this.props.baseUrl +
          "events/list_of_participant/" +
          this.props.match.params.id,
        config
      )
      .then(response => {
        let addClass = response.data.map(user => {
          let temp = user;
          if (temp.invitation_status === 1) {
            temp.class = "";
          } else if (temp.invitation_status === -1) {
            temp.class = "text-danger";
          } else {
            temp.class = "";
          }
          return temp;
        });
        this.setState({ participants: addClass });
        this.setState({ searchParticipants: addClass });
      })
      .catch(error => {
        console.log(error);
      });

    // to display category options
    let getPreference = {
      url: this.props.baseUrl + "category",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      params: {
        category: this.state.event.category
      }
    };

    let responsePreference = await axios(getPreference);
    await this.setState({ preferenceOptions: responsePreference.data });

    // to display preference options
    let postPreference = {
      url: this.props.baseUrl + "users/preferences",
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      data: {
        event_id: this.props.match.params.id,
        preference: this.state.preferenceOptions[0].preference
      }
    };

    let postResponse = await axios(postPreference);
  };

  // to handle the change in preference input
  handlePreference = async e => {
    await this.setState({ preference: e.target.value });

    let putPreference = {
      url:
        this.props.baseUrl + "users/preferences/" + this.props.match.params.id,
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      data: {
        preference: this.state.preference
      }
    };

    let putResponse = await axios(putPreference);
  };

  // method to change the date format
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

  // method to search participants
  search = e => {
    let keyword = e.target.value;
    let result = this.state.participants.filter(participant => {
      let keywordMatch1 = participant.fullname.search(keyword);
      let keywordMatch2 = participant.username.search(keyword);

      return keywordMatch1 !== -1 || keywordMatch2 !== -1;
    });

    this.setState({ searchParticipants: result });
  };

  render() {
    return (
      <div className="eventDetailContent">
        <Header />
        <div className="vh-100 mbForFooter">
          {/* container event detail */}
          <div className="border container my-3 p-3 mobileView rounded">
            <h1 className="text-center">{this.state.event.event_name}</h1>
            <hr />
            <h6 className="text-center m-0">
              Creator: {this.state.event.creator_username}
            </h6>
            <div className="category my-3">
              <h6 className="text-center">
                Category:{" "}
                {this.props.verboseCategory[this.state.event.category]}
              </h6>
            </div>
            <div className="row justify-content-center mb-3">
              <div className="preferenceSelect col-8 text-center">
                <label for="preference">Select your preference :</label>
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
                      );
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
                <Link to={`/calculate/${this.state.event.event_id}`}>
                  <button className="btn btn-primary m-1">
                    Suggest Our Event
                  </button>
                </Link>
              </div>
            </div>
            <div className="row justify-content-center mb-0">
              <div className="button-add col-8 text-center">
                <Link
                  to={"/editDate/" + this.state.event.event_id}
                  className="btn btn-primary m-1 w-100"
                >
                  Manage my date
                </Link>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="search-user text-center">
                <input
                  type="text"
                  placeholder="search by username"
                  className="text-center my-3"
                  onChange={this.search}
                ></input>
              </div>
            </div>
            <div className="participant p-3">
              {this.state.searchParticipants.map((value, index) => {
                return <ParticipantCard user={value} class={value.class} />;
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  "baseUrl, place, verboseCategory",
  actions
)(withRouter(EventDetails));
