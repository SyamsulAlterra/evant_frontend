import React from "react";
import CalendarCell from "./CalendarCell";

class CalendarGrid extends React.Component {
  render() {
    return (
      <div className="calendarGrid centering">
        <table>
          <tr>
            {this.props.dates.map(day => {
              return (
                <td className="p-0">
                  <CalendarCell
                    dates={day}
                    month={this.props.month}
                    year={this.props.year}
                    today={this.props.today}
                    currentMonth={this.props.currentMonth}
                    currentYear={this.props.currentYear}
                  ></CalendarCell>
                </td>
              );
            })}
          </tr>
        </table>
      </div>
    );
  }
}

export default CalendarGrid;
