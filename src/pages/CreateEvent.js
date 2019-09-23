import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { connect } from "unistore/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import KickFriend from "../components/KickFriend";
import { actions } from "../Store";

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
    // to display search result
    await this.setState({ searchResult: this.props.participants });
  };

  // method to search
  componentWillUpdate = async (nextProps, prevState) => {
    if (this.props.participants !== nextProps.participants) {
      await this.setState({ searchResult: nextProps.participants });
    }
  };

  // method to handle change in category field
  handleCategory = async e => {
    let inputCategory = e.target.value;
    await this.props.setCategoryGlobal(inputCategory);
  };

  // method to handle change in event name field
  handleEventName = async e => {
    let inputEventName = e.target.value;
    await this.props.setEventNameGlobal(inputEventName);
  };

  // method to handle change in start date field
  handleStartDate = async date => {
    let start = date.getTime();
    let end = await this.props.endDate.getTime();
    let forwardTime = end - start;
    let dayCount = (await Math.ceil(forwardTime / (24 * 3600 * 1000))) + 1;
    if (date < this.state.today) {
      Swal.fire(
        "Error",
        "You choose passed date or today as start date",
        "warning"
      );
      return false;
    } else if (forwardTime < 0) {
      Swal.fire(
        "Error",
        "start date exceed end date, please check your date",
        "warning"
      );
      return false;
    } else {
      await this.setState({
        startDate: this.convert(date)
      });
      await this.props.setStartDateGlobal(date);
      if (dayCount >= 1) {
        this.setState({ duration: dayCount });
      }
    }
  };

  // method to handle change in end date field
  handleEndDate = async date => {
    let start = await this.props.startDate.getTime();
    let end = date.getTime();
    let forwardTime = end - start;
    let dayCount = (await Math.ceil(forwardTime / (24 * 3600 * 1000))) + 1;
    if (date < this.state.today) {
      Swal.fire(
        "Error",
        "You choose passed date or today as start date",
        "warning"
      );
      return false;
    } else if (forwardTime < 0) {
      Swal.fire(
        "Error",
        "start date exceed end date, please check your date",
        "warning"
      );
      return false;
    } else {
      await this.setState({
        endDate: this.convert(date)
      });
      await this.props.setEndDateGlobal(date);
      if (dayCount >= 1) {
        this.setState({ duration: dayCount });
      }
    }
  };

  // method to handle duration change
  handleDuration = async e => {
    let duration = e.target.value;
    let re = /[0-9]+$/;
    if (!re.test(duration)) {
      await this.setState({ durationClass: "border-danger" });
      await this.props.setDurationGlobal(duration);
    } else if (
      parseInt(duration) > parseInt(this.state.duration) ||
      duration === "" ||
      parseInt(duration) <= 0
    ) {
      await this.setState({ durationClass: "border-danger" });
      await this.props.setDurationGlobal(duration);
    } else {
      await this.setState({ durationClass: "" });
      await this.props.setDurationGlobal(duration);
    }
  };

  // method to create event
  createEvent = async e => {
    e.preventDefault();
    const self = this;
    let re = /^[0-9]+$/;

    // to set default category
    if (self.props.category === "" || self.props.category === undefined) {
      this.props.setCategoryGlobal("vacation");
    }

    // validate duration
    if (!re.test(this.props.duration)) {
      Swal.fire("Warning", "Please enter valid number for duration", "warning");
      return false;
    } else if (this.props.duration === "") {
      Swal.fire("Warning", "You haven't enter your event duration", "warning");
      return false;
    } else if (parseInt(this.props.duration) < 1) {
      Swal.fire(
        "Warning",
        "Invalid duration, please check your duration",
        "warning"
      );
      return false;
    } else if (parseInt(this.props.duration) > parseInt(this.state.duration)) {
      Swal.fire("Warning", "Duration exceed date range", "warning");
      return false;
    } else {
      const configCreate = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };
      await axios
        .post(
          this.props.baseUrl + "events",
          {
            category: self.props.category,
            event_name: self.props.eventName,
            start_date_parameter: self.convert(self.props.startDate),
            end_date_parameter: self.convert(self.props.endDate),
            duration: self.props.duration
          },
          configCreate
        )
        .then(response => {
          localStorage.setItem("event_id", response.data.event_id);
          localStorage.setItem("topic", response.data.event_name);
        })
        .catch(error => {
          Swal.fire(
            "Error",
            "Oops! Something Went Wrong, Please Try Again",
            "error"
          );
        });

      let configInvite;

      // sending invitations to selected users
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
      });

      // to give notifications to invited users
      await this.props.participants.map(async participant => {
        let config1 = {
          url:
            "https://iid.googleapis.com/iid/v1/" +
            participant.token_broadcast +
            "/rel/topics/" +
            localStorage.getItem("event_id"),
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "key=AAAAnktM3bQ:APA91bHXVzYRZx__6Iw7t_EvmPVlGzr6Juj2QphrjNl3UwUeJvk9P8aq4GUUw7_IvLE4Limh_xKsloZ_KysnXNub8Z0M_kI0DMcAC6jVDmgQ8vrFPrMYqU8PECfV7ysiYYQMIo_5BhyZ"
          }
        };

        await axios(config1)
          .then(() => {
            console.log("Success", "Topic has been broadcasted", "success");
          })
          .catch(() => {
            console.log("Error message", "error");
          });
        let config = {
          url: "https://fcm.googleapis.com/fcm/send",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "key=AAAAnktM3bQ:APA91bHXVzYRZx__6Iw7t_EvmPVlGzr6Juj2QphrjNl3UwUeJvk9P8aq4GUUw7_IvLE4Limh_xKsloZ_KysnXNub8Z0M_kI0DMcAC6jVDmgQ8vrFPrMYqU8PECfV7ysiYYQMIo_5BhyZ"
          },
          data: {
            notification: {
              title: "Invitation",
              body:
                localStorage.getItem("username") +
                " Invite you to join event " +
                localStorage.getItem("topic"),
              click_action: "https://myevant.com/",
              icon:
                "http://pixsector.com/cache/6c0d32b0/av711d9b2225038847817.png"
            },
            to: "/topics/" + localStorage.getItem("event_id")
          }
        };

        axios(config)
          .then(() => {
            console.log(
              "Success",
              "Notification has been broadcasted",
              "success"
            );
          })
          .catch(() => {
            console.log(
              "Oops! Something Went Wrong",
              "Please Try Again",
              "error"
            );
          });
      });

      Swal.fire(
        "Event Successfully Created!",
        "Invitations has been sent!",
        "success"
      );
      await this.props.clearParticipantsOnGlobal();
      await this.props.clearCreateEvent();
      this.props.history.push("/events");
    }
  };

  // method to cancel create event
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

  // method to search user to invite
  searchParticipant = e => {
    let key = e.target.value;
    let result = this.props.participants.filter(participant => {
      let name = participant.fullname.search(key);
      let username = participant.username.search(key);

      return name !== -1 || username !== -1;
    });

    this.setState({ searchResult: result });
  };

  // to change format date
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
    // for date picker button
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
    return (
      <div className="createEvent-content mbForFooter">
        <Header />
        <div className="rounded container my-5 mobileView animated fadeIn">
          <h5 className="text-center mt-5">CREATE EVENT</h5>
          <hr></hr>
          <div className="">
            {/* input event name */}
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
            {/* select category */}
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
            {/* display invited users */}
            <div className="row justify-content-center no-gutters">
              <div className="text-center">
                <label for="friends" className="mt-4 mb-0 text-center">
                  <b>Your Invited Friend(s)</b>
                </label>
              </div>
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
            {/* input start, end date, and event duration */}
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
        <Footer />
      </div>
    );
  }
}

export default connect(
  "baseUrl, participants, eventName, category, startDate, endDate, duration, verboseCategory",
  actions
)(CreateEvent);
