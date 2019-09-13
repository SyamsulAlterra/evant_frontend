import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { Link } from "react-router-dom";
import { actions } from "../Store";
import FriendsCard from "../components/FriendsCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";


class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "holiday",
      eventName: "",
      date: null,
      duration: 0
    };
  }

  handleCategory = async e => {
    let inputCategory = e.target.value;
    await this.setState({ category: inputCategory });
  };

  componentDidMount = () => {
    console.log(this.state.startDate);
  };

  handleEventName = async e => {
    let inputEventName = e.target.value;
    await this.setState({ eventName: inputEventName });
  };

  handleStartDate = async date => {
    await this.setState({
      startDate: date,
      startDateFromatted: this.convert(date)
    });
    console.log("data", this.state.startDateFromatted);
    console.log("tipe", typeof this.state.startDateFromatted);
  };

  handleEndDate = async date => {
    await this.setState({
      endDate: date,
      endDateFormatted: this.convert(date)
    });
    console.log("data", this.state.endDateFormatted);
    console.log("tipe", typeof this.state.endDateFormatted);
  };

  handleDuration = async e => {
    let duration = e.target.value;
    await this.setState({
      duration: parseInt(duration)
    });
    console.log("value duration", this.state.duration);
    console.log("tipe duration", typeof this.state.duration);
  };

  createEvent = async e => {
    e.preventDefault();
    const self = this;
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    await axios
      .post(
        this.props.baseUrl + "events",
        {
          category: self.state.category,
          event_name: self.state.eventName,
          start_date_parameter: self.state.startDateFromatted,
          end_date_parameter: self.state.endDateFormatted,
          duration: self.state.duration
        },
        config
      )
      .then(response => {
        console.log(response);
        self.props.history.push("/home");
      });
  };


  cancelEvent = async () => {
    await this.props.clearParticipantsOnGlobal();
    this.props.history.push("/home");
  };

  // method to convert date before inserted into database
  convert(str) {
    let dateString = str.toString();
    const months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
      },
      date = dateString.split(" ");

    return [date[2], months[date[1]], date[3]].join("/");
  }


  render() {
    return (
      <div className="createEvent-content">
        <h1 className="text-center">CREATE EVENT PAGE</h1>
        <div className="container mobileView">
          <div className="row justify-content-center mb-3">
            <div className="event-name col-8 text-center">
              <label for="exampleFormControlSelect1">Event Name</label>
              <br />
              <input
                type="text"
                placeholder="event name"
                onChange={this.handleEventName}
              />
            </div>
          </div>
          <div className="row justify-content-center mb-3">
            <div className="category-select col-8 text-center">
              <label for="category">Select Category</label>
              <span>
                <select
                  className="form-control"
                  id="category"
                  onChange={this.handleCategory}
                >
                  <option selected value="vacation">
                    Holiday
                  </option>
                  <option value="eat">Eat Out</option>
                  <option value="hiking">Hiking</option>
                </select>
              </span>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="search-user col-8 text-center">
              <input type="text" placeholder="search"></input>
            </div>
            <Link to="/invite" className="button-add col-4 text-center">
              <button className="btn m-1">invite user</button>
            </Link>
          </div>
          <div className="row justify-content-center">
            {this.props.participants.map(value => {
              return (
                <div className="col-12 text-center">
                  <FriendsCard user={value}></FriendsCard>
                  <br />
                </div>
              );
            })}
          </div>
          <div className="row startDate-section justify-content-center">
            <div className="col-12 text-center">
              Start Date <br />
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleStartDate}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="row startDate-section justify-content-center">
            <div className="col-12 text-center">
              End Date <br />
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleEndDate}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="row duration justify-content-center">
            <div className="col-12 text-center">Duration</div>
            <div className="col-12 text-center">
              <input
                type="text"
                placeholder="duration"
                onChange={this.handleDuration}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-success m-1" onClick={this.cancelEvent}>
              cancel
            </button>
            <button className="btn btn-success m-1" onClick={this.createEvent}>
              create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "baseUrl, participants",
  actions
)(CreateEvent);
