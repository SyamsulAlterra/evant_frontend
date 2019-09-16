import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { Link } from "react-router-dom";
import { actions } from "../Store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import KickFriend from "../components/KickFriend";
import Swal from "sweetalert2";

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      startDate: null,
      endDate: null,
      searchResult: []
    };
  }

  componentDidMount = async () => {
    await this.setState({ searchResult: this.props.participants });
  };

  componentWillUpdate = async (nextProps, prevState) => {
    if (this.props.participants !== nextProps.participants) {
      await this.setState({ searchResult: nextProps.participants });
    }
  };

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

    Swal.fire(
      "Event Successfully Created!",
      "Invitations has been sent!",
      "success"
    );
    await this.props.clearParticipantsOnGlobal();
    await this.props.clearCreateEvent();
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

  searchParticipant = e => {
    let key = e.target.value;
    let result = this.props.participants.filter(participant => {
      let name = participant.fullname.search(key);
      let username = participant.username.search(key);

      return name !== -1 || username !== -1;
    });

    this.setState({ searchResult: result });
  };

  render() {
    return (
      <div className="createEvent-content">
        <Header></Header>
        <div className="border container my-5 p-3 mobileView">
          <h3 className="text-center">CREATE EVENT</h3>
          <div className="">
            <div className="row justify-content-center mb-3">
              <div className="event-name col-12 text-center">
                <label for="exampleFormControlSelect1">Event Name</label>
                <br />
                <input
                  type="text"
                  placeholder="event name"
                  onChange={this.handleEventName}
                  value={this.props.eventName}
                  className="w-100"
                />
              </div>
            </div>
            <div className="row justify-content-center mb-3">
              <div className="category-select col-12 text-center">
                <label for="category">Select Category</label>
                <span>
                  <select
                    className="form-control"
                    id="category"
                    onChange={this.handleCategory}
                    value={this.props.category}
                  >
                    <option selected="selected" value="vacation">
                      Holiday
                    </option>
                    <option value="eat">Eat Out</option>
                    <option value="hiking">Hiking</option>
                  </select>
                </span>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="search-user col-8 text-center my-1">
                <input
                  type="text"
                  placeholder="search participant"
                  onChange={this.searchParticipant}
                ></input>
              </div>
              <Link to="/invite" className="button-add col-4 p-0 text-left">
                <button className="btn btn-primary m-1">invite user</button>
              </Link>
            </div>
            <div>
              <div className="row justify-content-center invitedBox m-3">
                {this.state.searchResult.map(value => {
                  return (
                    <div className="w-100 text-center">
                      <KickFriend className="m-0" user={value}></KickFriend>
                    </div>
                  );
                })}
              </div>
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
                  className="w-100"
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <button
                className="btn btn-success m-3"
                onClick={this.cancelEvent}
              >
                cancel
              </button>
              <button
                className="btn btn-success m-3"
                onClick={this.createEvent}
              >
                create
              </button>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(
  "baseUrl, participants, eventName, category, startDate, endDate, duration",
  actions
)(CreateEvent);
