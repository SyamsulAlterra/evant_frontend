import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { Link } from "react-router-dom";
import { actions } from "../Store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";
import Header from "../components/Header";
import KickFriend from "../components/KickFriend";

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      startDate: null,
      endDate: null
    };
  }

  handleCategory = async e => {
    let inputCategory = e.target.value;
    await this.props.setCategoryGlobal(inputCategory);
    // await this.setState({ category: inputCategory });
  };

  handleEventName = async e => {
    let inputEventName = e.target.value;
    await this.props.setEventNameGlobal(inputEventName);

    // await this.setState({ eventName: inputEventName });
  };

  handleStartDate = async date => {
    await this.setState({
      startDate: this.convert(date)
    });

    await this.props.setStartDateGlobal(date);
    console.log("start date", this.props.setStartDateGlobal);
  };

  handleEndDate = async date => {
    await this.setState({
      endDate: this.convert(date)
    });

    await this.props.setEndDateGlobal(date);
    console.log("end date", this.props.setEndDateGlobal);
  };

  handleDuration = async e => {
    let duration = e.target.value;

    await this.props.setDurationGlobal(duration);
  };

  createEvent = async e => {
    e.preventDefault();
    const self = this;
    const configCreate = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    await axios.post(
      this.props.baseUrl + "events",
      {
        category: self.props.category,
        event_name: self.props.eventName,
        start_date_parameter: self.convert(self.props.startDate),
        end_date_parameter: self.convert(self.props.endDate),
        duration: self.props.duration
      },
      configCreate
    );

    let configInvite;

    await this.props.participants.map(async participant => {
      configInvite = {
        url: this.props.baseUrl + "invitations",
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        data: {
          invited_id: participant.user_id
        }
      };

      let response = await axios(configInvite);
      console.log(response.data);
    });

    alert(
      "your event successfully created and all your invitations has been sent"
    );
    this.props.history.push("/events");
  };

  cancelEvent = async () => {
    await this.props.clearParticipantsOnGlobal();
    await this.props.clearCreateEvent();
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
        <Header></Header>
        <div className="border container my-3 p-3 mobileView">
          <h3 className="text-center">CREATE EVENT</h3>
          <div className="">
            <div className="row justify-content-center mb-3">
              <div className="event-name col-8 text-center">
                <label for="exampleFormControlSelect1">Event Name</label>
                <br />
                <input
                  type="text"
                  placeholder="event name"
                  onChange={this.handleEventName}
                  value={this.props.eventName}
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
                    value={this.props.category}
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
                    <KickFriend className="m-0" user={value}></KickFriend>
                    <br />
                  </div>
                );
              })}
            </div>
            <div className="row startDate-section justify-content-center">
              <div className="col-12 text-center">
                Start Date <br />
                <DatePicker
                  selected={this.props.startDate}
                  onChange={this.handleStartDate}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="row startDate-section justify-content-center">
              <div className="col-12 text-center">
                End Date <br />
                <DatePicker
                  selected={this.props.endDate}
                  onChange={this.handleEndDate}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="row duration justify-content-center">
              <div className="col-12 text-center">Duration (days)</div>
              <div className="col-12 text-center">
                <input
                  type="text"
                  placeholder="duration"
                  onChange={this.handleDuration}
                  value={this.props.duration}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <button
                className="btn btn-success m-1"
                onClick={this.cancelEvent}
              >
                cancel
              </button>
              <button
                className="btn btn-success m-1"
                onClick={this.createEvent}
              >
                create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "baseUrl, participants, eventName, category, startDate, endDate, duration",
  actions
)(CreateEvent);
