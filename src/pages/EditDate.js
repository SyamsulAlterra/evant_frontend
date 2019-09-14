import React from "react";
import { connect } from "unistore/react";
import { actions } from "../Store";
import CalendarGrid from "../components/CalendarGrid";
import CalendarTitle from "../components/CalendarTitle";

class EditDate extends React.Component {
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
      month: today.getMonth() + 1,
      currentMonth: today.getMonth() + 1
    });
    await this.setState({
      year: today.getFullYear(),
      currentYear: today.getFullYear()
    });

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
    const totalYear = [...Array(12).keys()];
    const yearChoices = totalYear.map(inc => {
      return this.state.currentYear + inc;
    });

    return (
      <div className="EditDate container mobileView p-0 mt-0">
        <div className="text-right mx-5">
          <img src="" alt=""></img>
          <select
            className="button centering p-0 mx-1 my-3 optionMonth"
            onChange={this.handleMonth}
          >
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
              // availableDates={this.props.availableDates}
            ></CalendarGrid>
          );
        })}
      </div>
    );
  }
}

export default connect(
  "totalLeapYear",
  actions
)(EditDate);
