import React from "react";
import { connect } from "unistore/react";
import { actions } from "../Store";
import CalendarGrid from "./CalendarGrid";
import CalendarTitle from "./CalendarTitle";
import { Link } from "react-router-dom";
import axios from "axios";

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
      startDate: null,
      start: null,
      end: null,
      startYear: null,
      endYear: null,
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
    let date = new Date(year, month - 1, 1);
    this.setState({
      offset: date.getDay()
    });

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
    //change the list of month based on year
    this.setState({
      monthDictionary: this.state.monthDictionary.slice(
        this.state.prepareDateDict[pickedYear][0] - 1,
        this.state.prepareDateDict[pickedYear][
          this.state.prepareDateDict[pickedYear].length - 1
        ]
      )
    });
    this.setState({ year: parseInt(pickedYear) });
  };

  componentWillMount = async () => {
    // get event from page EventDetailParticipanta nd save in local state
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    await axios
      .get(this.props.baseUrl + "events/" + this.props.event_id, config)
      .then(response => {
        this.setState({ event: response.data });
        console.log("ini eventku", this.state.event);
      })
      .catch(error => {
        console.log(error);
      });

    //set the imperative parameter for generate date base on start_date_parameter, end_date_parameter
    await this.setState({
      start: parseInt(this.state.event.start_date_parameter.slice(3, 5))
    });
    await this.setState({
      startDate: parseInt(this.state.event.start_date_parameter.slice(0, 2))
    });
    await this.setState({
      month: parseInt(this.state.event.start_date_parameter.slice(3, 5))
    });
    await this.setState({
      end: parseInt(this.state.event.end_date_parameter.slice(3, 5))
    });
    await this.setState({
      startYear: parseInt(this.state.event.start_date_parameter.slice(6, 10))
    });
    await this.setState({
      endYear: parseInt(this.state.event.end_date_parameter.slice(6, 10))
    });
    console.log("ini start monthku", this.state.start);
    console.log("ini end monthku", this.state.end);

    let today = new Date();

    let dates = {};
    for (var i = this.state.startYear; i <= this.state.endYear; i++) {
      var endMonth =
        i != this.state.endYear ? 11 : parseInt(this.state.end) - 1;
      var startMon =
        i === this.state.startYear ? parseInt(this.state.start) - 1 : 0;
      let dates_params = [];
      for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        var month = j + 1;
        var displayMonth = month < 10 ? "0" + month : month;
        dates_params.push(parseInt(displayMonth));
      }
      dates[i.toString()] = dates_params;
    }

    //set the range generate month and year in local state prepareDateDict
    await this.setState({ prepareDateDict: dates });
    //cek this.state.month
    console.log(this.state.month);

    // change the state monthDictionary
    await this.setState({
      monthDictionary: this.state.monthDictionary.slice(
        this.state.prepareDateDict[this.state.startYear][0] - 1,
        this.state.prepareDateDict[this.state.startYear][
          this.state.prepareDateDict[this.state.startYear].length - 1
        ]
      )
    });

    await this.setState({ todayDate: today.getDate() });
    await this.setState({
      month: today.getMonth() + 1,
      currentMonth: today.getMonth() + 1
    });
    await this.setState({
      year: today.getFullYear(),
      currentYear: today.getFullYear()
    });

    this.populateCalendar(this.state.start, this.state.startYear);
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
    const totalYear = [
      ...Array(Object.keys(this.state.prepareDateDict).length).keys()
    ];
    const yearChoices = totalYear.map(inc => {
      return this.state.currentYear + inc;
    });

    return (
      <div className="Calendar container mobileView p-0 mt-0">
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
            {this.state.monthDictionary.map((month, i) => {
              if (i + 1 === this.state.currentMonth) {
                return <option value={i + 1}>{month}</option>;
              } else {
                return <option value={i + 1}>{month}</option>;
              }
            })}
          </select>
          <select
            className="button centering p-0 mx-1 my-3"
            onChange={this.handleYear}
          >
            {yearChoices.map(year => {
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
              href="#"
              role="button"
            >
              Done
            </Link>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "totalLeapYear, baseUrl",
  actions
)(Calendar);
