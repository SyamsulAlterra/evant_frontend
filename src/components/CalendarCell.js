import React from "react";

class CalendarCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellClass: "",
      modalMessage: "",
      cellStatus: -99
    };
  }

  componentWillReceiveProps = async () => {
    const todayDate = await `${this.props.today}/${this.props.currentMonth}/${this.props.currentYear}`;
    const date = await `${this.props.dates}/${this.props.month}/${this.props.year}`;
    if (todayDate === date) {
      await this.setState({ cellClass: "today" });
    } else if (this.state.cellStatus === 1) {
      await this.setState({ cellClass: "bg-success" });
    } else if (this.state.cellStatus === -1) {
      await this.setState({ cellClass: "bg-danger" });
    }

    const invalidDates = await ["S", "M", "T", "W", "T", "F", "S"];
    const isDateInvalid = invalidDates.filter(date => {
      return this.props.dates === date;
    });

    if (this.props.dates === "" || isDateInvalid.length > 0) {
      await this.setState({
        modalMessage: "Please kindly check your date, invalid choice"
      });
    } else if (this.state.cellStatus === 0) {
      await this.setState({
        modalMessage: `Are you sure want to MARK ${date} as available?`
      });
    } else if (this.state.cellStatus === 1) {
      await this.setState({
        modalMessage: `Are you sure want to UNMARK ${date} as available?`
      });
    } else if (this.state.cellStatus === -1) {
      await this.setState({
        modalMessage: `The date is already book`
      });
    }
  };

  componentWillUpdate = async (prevProps, prevState) => {
    if (prevState.cellStatus !== this.state.cellStatus) {
      console.log(prevState.cellStatus, this.state.cellStatus);
      const date = `${this.props.dates}/${this.props.month}/${this.props.year}`;
      if (this.state.cellStatus === 1) {
        await this.setState({
          cellClass: "bg-success",
          modalMessage: `Are you sure want to UNMARK ${date} as available?`
        });
      } else if (this.state.cellStatus === -1) {
        await this.setState({
          cellClass: "bg-danger",
          modalMessage: `The date is already book`
        });
      } else {
        await this.setState({
          cellClass: "",
          modalMessage: `Are you sure want to MARK ${date} as available?`
        });
      }
    }
  };

  handleClick = async input => {
    if (this.state.cellStatus === 0) {
      await this.setState({ cellStatus: 1 });
    } else if (this.state.cellStatus === 1 || this.state.cellStatus === -99) {
      await this.setState({ cellStatus: 0 });
    }

    let result = input + "/" + this.props.month + "/" + this.props.year;
    console.log(result);
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
