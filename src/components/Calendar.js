import React from "react";
import CalendarGrid from "./CalendarGrid";
import { connect } from "unistore/react";
import { actions } from "../Store";
import CalendarDetail from "./CalendarDetail";
import CalendarTitle from "./CalendarTitle";
import "bootstrap/dist/js/bootstrap.bundle";
import Axios from "axios";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      offset: 0,
      totalDays: 0,
      todayDate: 0,
      month: 9,
      year: 2019,
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
      ]
    };
  }

  // change 1 digit number to 2 digit format
  twoDigitString = number => {
    if (number < 10) {
      return `0${number}`;
    } else {
      return `${number}`;
    }
  };

  //check leap year
  isLeapYear = year => {
    if (year % 4 === 0 && year % 100 !== 0) {
      return true;
    } else if (year % 4 === 0 && (year % 100 === 0 && year % 400 === 0)) {
      return true;
    } else {
      return false;
    }
  };

  // populate calendar table
  populateCalendar = async (month, year) => {
    //get current date to component state
    let date = new Date(year, month - 1);
    this.setState({ offset: date.getDay() });

    //check leap year
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

  //get user picked month value
  handleMonth = e => {
    let pickedMonth = e.target.value;
    this.setState({ month: pickedMonth });
  };

  //get user picked year value
  handleYear = e => {
    let pickedYear = e.target.value;
    this.setState({ year: parseInt(pickedYear) });
  };

  //component preparation value before mounting
  componentWillMount = async () => {
    //get today date, month, and year
    let today = new Date();
    await this.setState({ todayDate: today.getDate() });
    await this.setState({
      month: today.getMonth() + 1,
      currentMonth: today.getMonth() + 1
    });
    await this.setState({
      year: today.getFullYear(),
      currentYear: today.getFullYear()
    });

    await this.populateCalendar(this.state.month, this.state.year);
  };

  //listen to changing year and month
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.state.month !== prevState.month ||
      this.state.year !== prevState.year
    ) {
      this.populateCalendar(this.state.month, this.state.year);
    }
  };

  render() {
    //variabel need to consturct calendar table
    let weeks;
    if (this.state.offset + this.state.totalDays > 35) {
      weeks = [1, 2, 3, 4, 5, 6];
    } else {
      weeks = [1, 2, 3, 4, 5];
    }
    const dates = [1, 2, 3, 4, 5, 6, 7];
    const totalYear = [...Array(12).keys()];
    const yearChoices = totalYear.map(inc => {
      return this.state.currentYear + inc;
    });

    return (
      <div className="Calendar container mobileView p-0 mt-0 animated fadeIn ">
        <div className="">
          <div className="text-right mx-4">
            {/* dropdown month */}
            <select
              className="button centering p-0 mx-1 my-3 optionMonth form-control size-select btn dropdown-toggle btn-outline-info"
              onChange={this.handleMonth}
            >
              {/* populate dropdown month */}
              {this.state.monthDictionary.map((month, i) => {
                if (i + 1 === this.state.currentMonth) {
                  return (
                    <option value={i + 1} selected="selected">
                      {month}
                    </option>
                  );
                } else {
                  return <option value={i + 1}>{month}</option>;
                }
              })}
            </select>

            {/* dropdown year */}
            <select
              className="button centering p-0 mx-1 my-3 form-control size-select btn-outline-info btn dropdown-toggle"
              onChange={this.handleYear}
            >
              {/* populate dropdown year */}
              {yearChoices.map(year => {
                return <option value={year}>{year}</option>;
              })}
            </select>
          </div>

          {/* calendar days table = [S, M, T, ..] */}
          <CalendarTitle></CalendarTitle>

          {/* fill calendar table with row */}
          {weeks.map(week => {
            // change calendar date to 2 string format
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

            // return calendar grid with it variable
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

          <div className="row px-0 eventDetail mt-2 mx-5">
            {/* today marks */}
            <div className="col-4 p-0 text-center">
              <div className="btn todayMark bgOren text-center"></div>
              <div className="text-center">
                <p className="eventDetail text-center">Today's Date</p>
              </div>
            </div>
            {/* chosen date mark */}
            <div className="col-4 p-0 text-center">
              <div className="btn btn-success todayMark text-center"></div>
              <div className="text-center">
                <p className="eventDetail text-center">Chosen Date</p>
              </div>
            </div>
            {/* booked date mark */}
            <div className="col-4 p-0 text-center">
              <div className="btn bgMerah todayMark text-center"></div>
              <div className="text-center">
                <p className="eventDetail text-center">Booked</p>
              </div>
            </div>
          </div>
        </div>

        {/* calendar detail (marked date section) */}
        <CalendarDetail
          selectedMonth={this.twoDigitString(this.state.month)}
          selectedYear={this.state.year}
        ></CalendarDetail>
      </div>
    );
  }
}

export default connect(
  "totalLeapYear, events, baseUrl",
  actions
)(Calendar);
