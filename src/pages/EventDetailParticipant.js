import React from "react";
import { Link } from "react-router-dom";
import { connect } from "unistore/react";
import axios from "axios";
import ParticipantCard from "../components/ParticipantCard";
import checked from "../images/checked.png";
import error from "../images/error.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

class EventDetailParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      participants: [],
      searchResult: []
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
        this.setState({
          participants: response.data,
          searchResult: response.data
        });
      })
      .catch(error => {
        console.log(error);
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

  render() {
    console.log(this.state.event);
    return (
      <div className="eventDetailContent">
        <Header></Header>
        <div className="border container my-3 p-3 mobileView">
          <h1 className="text-center">{this.state.event.event_name}</h1>
          <h6 className="text-center m-0">
            ======================<br></br>
            creator: @{this.state.event.creator_username}
            <br></br>
            category :{this.state.event.category}
          </h6>
          <div className="row justify-content-center mb-0">
            <div className="preferenceSelect col-8 text-center">
              <label for="preference"></label>
              <span>
                <select
                  className="form-control"
                  id="category"
                  onChange={this.handleCategory}
                  value={this.props.category}
                >
                  <option selected value="vacation">
                    Select your preference
                  </option>
                  <option value="Culture">Culture</option>
                  <option value="Religion">Religion</option>
                  <option value="Museum">Museum</option>
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
          <div className="row justify-content-center mb-0">
            <div className="button-add col-8 text-center">
              <Link to="/editDate" className="btn btn-primary m-1 w-100">
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
          <div className="participant border border-secondary p-3">
            {this.state.searchResult.map((value, index) => {
              return <ParticipantCard user={value}></ParticipantCard>;
            })}
          </div>
          <div className="container">
            <div className="row no-gutters">
              <div className="col-6 text-center">
                <img alt="" src={error} className="cross m-3"></img>
                <br></br>
                Decline
              </div>
              <div className="col-6 text-center">
                <img alt="" src={checked} className="checked m-3"></img>
                <br></br>
                Ok
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect("baseUrl, eventName")(EventDetailParticipant);