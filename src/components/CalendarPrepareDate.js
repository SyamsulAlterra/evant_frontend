import React from "react";
import { connect } from "unistore/react";
import { actions } from "../Store";
import CalendarGrid from "./CalendarGrid";
import CalendarTitle from "./CalendarTitle";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";

class CalendarPrepareDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      offset: 0,
      totalDays: 0,
      todayDate: 0,
      month: 9,
      year: 2019,
      months: [],
      years: [],
      currentMonth: 9,
      currentYear: 2019,
      monthDictionary: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      prepareDateDict: {},
      event: []
    };
  }

  twoDigitString = number => {
    if (number < 10) {
      return `0${number}`;
    } else {
      return `${number}`;
    }
  };

  populateCalendar = async (month, year) => {
    //populate calendar table
    let date = new Date(year, month - 1);
    this.setState({ offset: date.getDay() });
    if (this.isLeapYear(year)) {
      await this.setState({
        dayInMonth: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      });
    } else {
      await this.setState({
        dayInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      });
    }
    await this.setState({ totalDays: this.state.dayInMonth[month - 1] });
  };

  isLeapYear = year => {
    //check wether year is leap year
    if (year % 4 === 0 && year % 100 !== 0) {
      return true;
    } else if (year % 4 === 0 && (year % 100 === 0 && year % 400 === 0)) {
      return true;
    } else {
      return false;
    }
  };

  handleMonth = e => {
    let pickedMonth = e.target.value;
    this.setState({ month: pickedMonth });
  };

  handleYear = e => {
    let pickedYear = e.target.value;
    this.setState({ year: parseInt(pickedYear) });
  };

  componentWillMount = async () => {
    let today = new Date();
    await this.setState({ todayDate: today.getDate() });
    await this.setState({
      currentMonth: today.getMonth() + 1
    });
    await this.setState({
      currentYear: today.getFullYear()
    });

    let config = {
      url: this.props.baseUrl + "events/" + this.props.match.params.event_id,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    await this.setState({ event: response.data });

    config = {
      url: this.props.baseUrl + "events/count",
      method: "post",
      data: {
        start_date: this.state.event.start_date_parameter,
        end_date: this.state.event.end_date_parameter
      }
    };

    response = await Axios(config);
    await this.setState({
      months: response.data.month,
      years: response.data.year,
      month: parseInt(response.data.month[0]),
      year: parseInt(response.data.year[0])
    });

    config = {
      url: this.props.baseUrl + "date",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    response = await Axios(config);
    await this.props.setAvailableDatesOnGlobal(response.data);

    config = {
      url: this.props.baseUrl + "events/booked",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    response = await Axios(config);
    await this.props.setEventsAndBookedDatesOnGlobal(
      response.data.booked_event,
      response.data.all_booked_dates
    );

    this.populateCalendar(this.state.month, this.state.year);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.state.month !== prevState.month ||
      this.state.year !== prevState.year
    ) {
      this.populateCalendar(this.state.month, this.state.year);
    }
  };
  render() {
    let weeks;
    if (this.state.offset + this.state.totalDays > 35) {
      weeks = [1, 2, 3, 4, 5, 6];
    } else {
      weeks = [1, 2, 3, 4, 5];
    }
    const dates = [1, 2, 3, 4, 5, 6, 7];

    return (
      <div className="CalendarPrepareDate container mobileView p-0 mt-0">
        <div className="row justify-content-center">
          <div className="col-6">
            {" "}
            <br></br>
            <h6>Your Available Date on</h6>
            <h6>
              {this.state.event.start_date_parameter} -
              {this.state.event.end_date_parameter}
            </h6>
          </div>
        </div>
        <div className="text-right mx-5">
          <img src="" alt=""></img>
          <select
            className="button centering p-0 mx-1 my-3 optionMonth"
            onChange={this.handleMonth}
          >
            {this.state.months.map((month, i) => {
              if (i === 0) {
                return (
                  <option value={parseInt(month)} selected="selected">
                    {this.state.monthDictionary[month - 1]}
                  </option>
                );
              } else {
                return (
                  <option value={parseInt(month)}>
                    {this.state.monthDictionary[month - 1]}
                  </option>
                );
              }
            })}
          </select>
          <select
            className="button centering p-0 mx-1 my-3"
            onChange={this.handleYear}
          >
            {this.state.years.map(year => {
              return <option value={year}>{year}</option>;
            })}
          </select>
        </div>
        <CalendarTitle></CalendarTitle>
        {weeks.map(week => {
          const tes = dates.map(date => {
            let currentDate = 7 * (week - 1) + date;
            if (
              currentDate > this.state.totalDays + this.state.offset ||
              currentDate <= this.state.offset
            ) {
              return "";
            } else {
              let dateString = this.twoDigitString(
                currentDate - this.state.offset
              );
              return dateString;
            }
          });
          return (
            <CalendarGrid
              dates={tes}
              month={this.twoDigitString(this.state.month)}
              year={this.state.year}
              today={this.twoDigitString(this.state.todayDate)}
              currentMonth={this.twoDigitString(this.state.currentMonth)}
              currentYear={this.state.currentYear}
            ></CalendarGrid>
          );
        })}
        <br></br>
        <div className="row justify-content-center">
          <div className="col-6 text-center">
            <Link
              to={"/participant/" + this.state.event.event_id}
              class="btn btn-outline-info"
              role="button"
            >
              Done
            </Link>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
}

export default connect(
  "totalLeapYear, baseUrl",
  actions
)(withRouter(CalendarPrepareDate));
