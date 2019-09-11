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
                  <CalendarCell value={day}></CalendarCell>
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
