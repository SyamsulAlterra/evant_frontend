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
      cellStatus: 0,
      todayDate: "",
      date: "",
      availableDates: []
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

  componentWillUpdate = async (prevProps, prevState) => {
    if (prevProps !== this.props) {
      await this.setState({ cellClass: "" });
      const todayDate = await `${this.props.today}/${this.props.currentMonth}/${this.props.currentYear}`;
      const date = await `${this.props.dates}/${this.props.month}/${this.props.year}`;

      let available = this.props.availableDates.filter(availableDate => {
        return availableDate === date;
      });

      console.log(date, todayDate);

      if (todayDate === date) {
        this.setState({ cellClass: "today" });
      } else if (available.length > 0) {
        this.setState({
          cellClass: "bg-success",
          modalMessage: `unmark ${this.formatDate(date)}`
        });
      } else if (available.length == 0) {
        this.setState({
          modalMessage: `mark ${this.formatDate(date)}`
        });
      }
    } else if (prevState.availableDates !== this.state.availableDates) {
      await this.setState({ cellClass: "" });
      const date = await `${this.props.dates}/${this.props.month}/${this.props.year}`;

      let available = this.state.availableDates.filter(availableDate => {
        return availableDate === date;
      });

      if (available.length > 0) {
        this.setState({
          cellClass: "bg-success",
          modalMessage: `unmark ${this.formatDate(date)}`
        });
      } else if (available.length == 0) {
        this.setState({
          modalMessage: `mark ${this.formatDate(date)}`
        });
      }
    }
  };

  handleClick = async input => {
    const date = await `${input}/${this.props.month}/${this.props.year}`;

    let config = {
      url: this.props.baseUrl + "date",
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      data: {
        date: date
      }
    };

    let response = await Axios(config);
    console.log(response.data);
    window.location.reload();
  };

  render() {
    return (
      <div>
        <div
          className={`calendarCell border text-right m-0 px-0 ${this.state.cellClass}`}
          data-toggle="modal"
          data-target={`#date${this.props.dates}`}
        >
          <p className="px-2 m-0 calendarCell">{this.props.dates}</p>
        </div>
        <div
          class="modal fade"
          id={`date${this.props.dates}`}
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
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => this.handleClick(this.props.dates)}
                  data-dismiss="modal"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(CalendarCell);
