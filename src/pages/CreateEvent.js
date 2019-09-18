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
      startDate: "-",
      endDate: "-",
      searchResult: [],
      today: new Date(),
      duration: 2,
      durationClass: "border-danger"
    };
  }

  componentWillMount = async () => {
    await this.setState({ searchResult: this.props.participants });
    // await this.props.setCategoryGlobal("vacation");

    console.log(this.props.category);
  };

  componentWillUpdate = async (nextProps, prevState) => {
    if (this.props.participants !== nextProps.participants) {
      await this.setState({ searchResult: nextProps.participants });
    }
  };

  handleCategory = async e => {
    let inputCategory = e.target.value;
    console.log(inputCategory);
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
    await console.log("startdate", this.state.startDate);
    console.log(date);
    await this.props.setStartDateGlobal(date);

    let start = await this.props.startDate.getTime();
    let end = await this.props.endDate.getTime();
    let dayCount = (await Math.ceil((end - start) / (24 * 3600 * 1000))) + 1;
    console.log(
      this.props.startDate.getDate(),
      this.props.endDate.getDate(),
      dayCount
    );
    if (date < this.state.today) {
      Swal.fire(
        "Error",
        "You choose passed date or today as start date",
        "warning"
      );
      return false;
    } else if (this.props.endDate < this.props.startDate) {
      Swal.fire(
        "Error",
        "start date exceed end date, please check your date",
        "warning"
      );
      return false;
    } else if (dayCount >= 1) {
      this.setState({ duration: dayCount });
    }
  };

  handleEndDate = async date => {
    await this.setState({
      endDate: this.convert(date)
    });
    await console.log("endadate", this.state.endDate);

    await this.props.setEndDateGlobal(date);
    console.log("end date", this.props.setEndDateGlobal);

    let start = await this.props.startDate.getTime();
    let end = await this.props.endDate.getTime();
    let dayCount = (await Math.ceil((end - start) / (24 * 3600 * 1000))) + 1;
    console.log(
      this.props.startDate.getDate(),
      this.props.endDate.getDate(),
      dayCount
    );
    if (date < this.state.today) {
      Swal.fire(
        "Error",
        "You choose passed date or today as start date",
        "warning"
      );
      return false;
    } else if (this.props.endDate < this.props.startDate) {
      Swal.fire(
        "Error",
        "start date exceed end date, please check your date",
        "warning"
      );
      return false;
    } else if (dayCount > 1) {
      this.setState({ duration: dayCount });
    }
  };

  handleDuration = async e => {
    let duration = e.target.value;
    console.log(
      this.state.duration,
      typeof this.state.duration,
      duration,
      typeof duration
    );
    if (parseInt(duration) > parseInt(this.state.duration)) {
      this.setState({ durationClass: "border-danger" });
      await this.props.setDurationGlobal(duration);
    } else {
      this.setState({ durationClass: "" });
      await this.props.setDurationGlobal(duration);
    }
  };

  createEvent = async e => {
    e.preventDefault();
    const self = this;
    if (self.props.category === "" || self.props.category === undefined) {
      this.props.setCategoryGlobal("vacation");
    }
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
    console.log(this.state.duration);
    const ExampleCustomInput1 = ({ value, onClick }) => (
      <button className="btn btn-primary" onClick={onClick}>
        Start Date
      </button>
    );
    const ExampleCustomInput2 = ({ value, onClick }) => (
      <button className="btn btn-primary" onClick={onClick}>
        End Date
      </button>
    );
    console.log(this.props.category);
    return (
      <div className="createEvent-content mbForFooter">
        <Header></Header>
        <div className="rounded container my-5 mobileView animated fadeIn">
          <h5 className="text-center mt-5">CREATE EVENT</h5>
          <hr></hr>
          <div className="">
            <div className="row justify-content-center">
              <div className="event-name col-9 text-center mt-2 mb-3">
                <label for="exampleFormControlSelect1">
                  <b>Event Name</b>
                  <p className="smallDetail mb-0">changeable</p>
                </label>
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
            <div className="row justify-content-center mt-1 mb-2">
              <div className="category-select col-9 text-center">
                <label for="category">
                  <b>Select Category</b>
                </label>
                <span>
                  <select
                    className="form-control"
                    id="category"
                    onChange={this.handleCategory}
                    value={this.props.category}
                  >
                    {["vacation", "eat", "hiking"].map(value => {
                      if (value === this.props.category) {
                        return (
                          <option selected="selected" value={value}>
                            {this.props.verboseCategory[value]}
                          </option>
                        );
                      } else {
                        return (
                          <option value={value}>
                            {this.props.verboseCategory[value]}
                          </option>
                        );
                      }
                    })}
                  </select>
                </span>
              </div>
            </div>
            <div className="row justify-content-center no-gutters">
              <div className="text-center">
                <label for="friends" className="mt-4 mb-0 text-center">
                  <b>Your Invited Friend(s)</b>
                </label>
              </div>
              {/* <div className="col-9">
                <input
                  className="w-100 friends"
                  type="text"
                  placeholder="search"
                  onChange={this.searchParticipant}
                ></input>
              </div> */}
            </div>
            <div>
              <div className="row justify-content-center invitedBox m-1">
                {this.state.searchResult.map(value => {
                  return (
                    <div className="w-100 text-center">
                      <KickFriend className="m-0" user={value}></KickFriend>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="row justify-content-center no-gutters">
              <div className="col-8 px-2 text-center">
                <Link to="/invite" className="button-add">
                  <button className="btn btn-primary m-0">invite other</button>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <label for="startDate" className="mt-4 text-center">
                <b>Time Range and Duration</b>
                <br></br>
                <span className="smallDetail mb-0">
                  click to change start and end date
                </span>
              </label>
            </div>
            <div className="row startDate-section justify-content-center">
              <div className="col-7 text-center my-2">
                <DatePicker
                  selected={this.props.startDate}
                  onChange={this.handleStartDate}
                  dateFormat="dd/MM/yyyy"
                  customInput={<ExampleCustomInput1 />}
                />
              </div>
              <div className="col-5 text-left p-0 my-3">
                : {this.formatDate(this.convert(this.props.startDate))}
              </div>
            </div>
            <div className="row startDate-section justify-content-center">
              <div className="col-7 text-center my-2">
                <DatePicker
                  selected={this.props.endDate}
                  onChange={this.handleEndDate}
                  dateFormat="dd/MM/yyyy"
                  customInput={<ExampleCustomInput2 />}
                />
              </div>
              <div className="col-5 text-left p-0 my-3">
                : {this.formatDate(this.convert(this.props.endDate))}{" "}
              </div>
            </div>
            <div className="row duration justify-content-center">
              <div className="col-12 text-center">
                <input
                  type="text"
                  placeholder="Duration (days)"
                  onChange={this.handleDuration}
                  value={this.props.duration}
                  className={`w-100 ${this.state.durationClass} rounded p-2`}
                />
                {[1].map(num => {
                  if (this.state.durationClass === "border-danger") {
                    return (
                      <div className="smallDetail mb-0">
                        event duration cannot exceed start - end date
                      </div>
                    );
                  }
                })}
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
  "baseUrl, participants, eventName, category, startDate, endDate, duration, verboseCategory",
  actions
)(CreateEvent);
