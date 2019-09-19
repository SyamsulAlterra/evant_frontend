import React from "react";
import Axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../Store";

class CalendarCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellClass: "",
      modalMessage: "",
      todayDate: "",
      date: ""
    };
  }
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
    let d = date.slice(0, 2);
    let m = parseInt(date.slice(3, 5));
    let y = date.slice(6, 10);
    return `${dateDictionary[m - 1]} ${d}, ${y}`;
  };

  forwardDate = (date1, date2) => {
    let dates = [date1, date2];
    let d = dates.map(date => {
      return parseInt(date.slice(0, 2));
    });

    let m = dates.map(date => {
      return parseInt(date.slice(3, 5));
    });

    let y = dates.map(date => {
      return parseInt(date.slice(6, 9));
    });

    if (y[1] > y[0]) {
      return true;
    } else if (m[1] > m[0] && y[1] === y[0]) {
      return true;
    } else if (d[1] >= d[0] && m[1] === m[0]) {
      return true;
    } else {
      return false;
    }
  };
  componentWillUpdate = async (prevProps, prevState) => {
    if (prevProps !== this.props) {
      await this.setState({ cellClass: "" });
      const todayDate = await `${this.props.today}/${this.props.currentMonth}/${this.props.currentYear}`;
      const date = await `${this.props.dates}/${this.props.month}/${this.props.year}`;

      let available = this.props.availableDates.filter(availableDate => {
        return availableDate === date;
      });

      let booked = this.props.allBookedDates.filter(bookedDate => {
        return bookedDate === date;
      });

      if (!this.forwardDate(todayDate, date) && this.props.dates !== "") {
        this.setState({
          cellClass: "Merah",
          modalMessage: "cannot mark passed date"
        });
      } else {
        if (todayDate === date) {
          this.setState({ cellClass: "bgOren" });
          this.setState({
            modalMessage: "Sorry, you cannot mark today's date"
          });
        } else if (this.props.dates === "") {
          this.setState({ cellClass: "" });
          this.setState({ modalMessage: "Oops, invalid date" });
        } else if (booked.length > 0) {
          this.setState({
            cellClass: "bgMerah text-white",
            modalMessage: "this date is currently booked"
          });
        } else if (available.length > 0) {
          this.setState({
            cellClass: "bg-success",
            modalMessage: `unmark ${this.formatDate(date)}`
          });
        } else if (available.length === 0) {
          this.setState({
            cellClass: "",
            modalMessage: `mark ${this.formatDate(date)}`
          });
        }
      }
    }
  };

  handleMark = async input => {
    const date = await `${input}/${this.props.month}/${this.props.year}`;

    if (this.state.modalMessage.split(" ")[0] === "mark") {
      let configMark = {
        url: this.props.baseUrl + "date",
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        data: {
          date: date
        }
      };

      let configGet = {
        url: this.props.baseUrl + "date",
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };

      await Axios(configMark);
      let responseGet = await Axios(configGet);
      await this.props.setAvailableDatesOnGlobal(responseGet.data);
    } else {
      let configUnmark = {
        url: this.props.baseUrl + "date",
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        data: {
          date: date
        }
      };

      let configGet = {
        url: this.props.baseUrl + "date",
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };

      await Axios(configUnmark);
      let responseGet = await Axios(configGet);
      await this.props.setAvailableDatesOnGlobal(responseGet.data);
    }
  };

  render() {
    if (this.state.cellClass === "" || this.state.cellClass === "bg-success") {
      return (
        <div className="borad">
          <div
            className={`calendarCell border text-center m-1 px-0 py-1 borad ${this.state.cellClass}`}
            data-toggle="modal"
            data-target={`#date${this.props.dates}`}
            onClick={() => this.handleMark(this.props.dates)}
          >
            <p className="px-2 m-0 calendarCell">{this.props.dates}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            className={`calendarCell border text-center m-1 px-0 py-1 borad ${this.state.cellClass}`}
            data-toggle="modal"
            data-target={`#tesdate${this.props.dates}`}
          >
            <p className="px-2 m-0 calendarCell">{this.props.dates}</p>
          </div>
          <div
            class="modal fade"
            id={`tesdate${this.props.dates}`}
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    {this.state.modalMessage}
                  </h5>
                </div>
                <div class="modal-footer">
                  {/* <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button> */}
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => this.handleMark(this.props.dates)}
                    data-dismiss="modal"
                  >
                    Oke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  "baseUrl, availableDates, events, allBookedDates",
  actions
)(CalendarCell);
