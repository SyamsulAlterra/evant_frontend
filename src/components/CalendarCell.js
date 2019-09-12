import React from "react";

class CalendarCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellClass: "",
      modalMessage: "",
      cellStatus: 0,
      todayDate: "",
      date: ""
    };
  }

  componentWillUpdate = async (prevProps, prevState) => {
    if (prevProps !== this.props) {
      await this.setState({ cellClass: "" });
      const todayDate = await `${this.props.today}/${this.props.currentMonth}/${this.props.currentYear}`;
      const date = await `${this.props.dates}/${this.props.month}/${this.props.year}`;

      if (todayDate === date) {
        this.setState({ cellClass: "today" });
      }
    } else if (prevState.cellStatus !== this.state.cellStatus) {
      console.log(prevState, this.state);
      this.setState({ cellClass: "" });
      if (this.state.cellStatus === 1) {
        this.setState({ cellClass: "bg-success" });
      }
    }
  };

  handleClick = async input => {
    if (this.state.cellStatus === 0) {
      await this.setState({ cellStatus: 1 });
    } else if (this.state.cellStatus === 1) {
      await this.setState({ cellStatus: 0 });
    }

    let result = input + "/" + this.props.month + "/" + this.props.year;
    console.log(result);
  };

  showCellStatus = () => {
    console.log(this.state.cellStatus);
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

export default CalendarCell;
