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

  // change format from 02/10/2019 to Oct 02, 2019
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

  // check wether date2 is bigger than date1
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

  // change state if marked/unmarked
  componentWillUpdate = async (prevProps, prevState) => {
    if (prevProps !== this.props) {
      // today date and cell date in dd/mm/yyyy format
      await this.setState({ cellClass: "" });
      const todayDate = await `${this.props.today}/${this.props.currentMonth}/${this.props.currentYear}`;
      const date = await `${this.props.dates}/${this.props.month}/${this.props.year}`;

      // check if cell is marked
      let available = this.props.availableDates.filter(availableDate => {
        return availableDate === date;
      });

      // check if cell is booked
      let booked = this.props.allBookedDates.filter(bookedDate => {
        return bookedDate === date;
      });

      //check if passed date
      if (!this.forwardDate(todayDate, date) && this.props.dates !== "") {
        this.setState({
          cellClass: "Merah",
          modalMessage: "cannot mark passed date"
        });
      } else {
        // check if today cell
        if (todayDate === date) {
          this.setState({ cellClass: "bgOren" });
          this.setState({
            modalMessage: "Sorry, you cannot mark today's date"
          });
          // check if blank cell
        } else if (this.props.dates === "") {
          this.setState({ cellClass: "" });
          this.setState({ modalMessage: "Oops, invalid date" });
          // check if cell is booked
        } else if (booked.length > 0) {
          this.setState({
            cellClass: "bgMerah text-white",
            modalMessage: "this date is currently booked"
          });
          // check if cell is marked
        } else if (available.length > 0) {
          this.setState({
            cellClass: "bg-success",
            modalMessage: `unmark ${this.formatDate(date)}`
          });
          // check if cell is standard cell
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
    // today date in dd/mm/yyyy format
    const date = await `${input}/${this.props.month}/${this.props.year}`;

    //check if we need to mark
    if (this.state.modalMessage.split(" ")[0] === "mark") {
      //configuration to mark date in database
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
      // mark database with axios
      await Axios(configMark);

      //get newly marked date after marking in step (line 131 - 142)
      let configGet = {
        url: this.props.baseUrl + "date",
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };

      //get new respond and set it to global state(store)
      let responseGet = await Axios(configGet);
      await this.props.setAvailableDatesOnGlobal(responseGet.data);

      //check if we need to unmark
    } else {
      //unmark configuration
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
      // unmark the database
      await Axios(configUnmark);

      //get new information after unmark the database
      let configGet = {
        url: this.props.baseUrl + "date",
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };

      //new data receive and set it to global state (store)
      let responseGet = await Axios(configGet);
      await this.props.setAvailableDatesOnGlobal(responseGet.data);
    }
  };

  render() {
    // check if cell is unmarked or marked, return cell with no mdal
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
      // if cell is not umarked or marked cell, return modal with corresponding message modal
    } else {
      return (
        <div>
          {/* calendar cell */}
          <div
            className={`calendarCell border text-center m-1 px-0 py-1 borad ${this.state.cellClass}`}
            data-toggle="modal"
            data-target={`#tesdate${this.props.dates}`}
          >
            <p className="px-2 m-0 calendarCell">{this.props.dates}</p>
          </div>
          {/* modal */}
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
                {/* modal header */}
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    {this.state.modalMessage}
                  </h5>
                </div>

                {/* modal footer */}
                <div class="modal-footer">
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
