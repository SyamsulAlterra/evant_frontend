import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import axios from "axios";
import ParticipantCard from "../components/ParticipantCard";
import checked from "../images/checked.png";
import error from "../images/error.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Axios from "axios";

class EventDetailParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      participants: [],
      searchResult: [],
      categories: [],
      preference: ""
    };
  }
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
        console.log(response.data);
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
      url: this.props.baseUrl + "category",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      params: {
        category: this.state.event.category
      }
    };

    let response = await Axios(config);
    await this.setState({
      categories: response.data,
      preference: response.data[0].preference
    });
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
  search = async e => {
    let searchKey = e.target.value;

    let result = this.state.participants.filter(participant => {
      let username = participant.username;
      let fullname = participant.fullname;
      let output1 = username.search(searchKey);
      let output2 = fullname.search(searchKey);
      return output1 !== -1 || output2 !== -1;
    });

    await this.setState({ searchResult: result });
  };
  declineEvent = async () => {
    let config = {
      url:
        this.props.baseUrl + "invitations/reject/" + this.props.match.params.id,
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    await Axios(config);
    this.props.history.push("/events");
  };
  handleCategory = e => {
    this.setState({ preference: e.target.value });
  };
  postPreference = async () => {
    let config = {
      url: this.props.baseUrl + "users/preferences",
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      data: {
        preference: this.state.preference,
        event_id: this.props.match.params.id
      }
    };

    await Axios(config);
    this.props.history.push("/events");
  };

  render() {
    return (
      <div className="eventDetailContentParticipant">
        <Header></Header>
        <div className="vh-100 mbForFooter">
          <div className="border shadow rounded container my-3 p-3 mobileView">
            <h1 className="text-center">{this.state.event.event_name}</h1>
            <h6 className="text-center m-0">
              <hr />
              creator: @{this.state.event.creator_username}
              <br></br>
              category: {this.state.event.category}
            </h6>
            <div className="row justify-content-center mb-0">
              <div className="preferenceSelect col-8 text-center">
                <label for="preference"></label>
                <span>
                  <select
                    className="form-control h-50 mb-3"
                    id="category"
                    onChange={this.handleCategory}
                  >
                    {this.state.categories.map((category, i) => {
                      if (i === 0) {
                        return (
                          <option
                            value={category.preference}
                            selected="selected"
                          >
                            {category.preference}
                          </option>
                        );
                      } else {
                        return (
                          <option value={category.preference}>
                            {category.preference}
                          </option>
                        );
                      }
                    })}
                  </select>
                </span>
              </div>
            </div>
            <div className="dateSection text-center mb-3">
              Range date :{" "}
              {this.formatDate(this.state.event.start_date_parameter)} -{" "}
              {this.formatDate(this.state.event.end_date_parameter)}
              <br />
              Event Duration : {this.state.event.duration} days
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
              <div className="search-user col-12 text-center my-3">
                <input
                  type="text"
                  placeholder="search username or fullname"
                  className="my-0 w-100 text-center"
                  onChange={this.search}
                ></input>
              </div>
            </div>
            <div className="participant p-3">
              {this.state.searchResult.map((value, index) => {
                return (
                  <ParticipantCard
                    user={value}
                    class={value.class}
                  ></ParticipantCard>
                );
              })}
            </div>
            <div className="container">
              <div className="row no-gutters">
                <Link className="col-6 text-center">
                  <img
                    alt=""
                    src={error}
                    className="cross m-3"
                    onClick={this.declineEvent}
                  ></img>
                  <br></br>
                  Decline
                </Link>
                <Link
                  className="col-6 text-center"
                  onClick={this.postPreference}
                >
                  <img alt="" src={checked} className="checked m-3"></img>
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

export default connect("baseUrl, eventName, verboseCategory, preference")(
  withRouter(EventDetailParticipant)
);
