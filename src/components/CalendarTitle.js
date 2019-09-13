import React from "react";

class CalendarTitle extends React.Component {
  render() {
    return (
      <div className="calendarTitle">
        <table>
          <tr>
            {["S", "M", "T", "W", "T", "F", "S"].map(num => {
              return (
                <td className="calendarCell text-right bg-info border px-2">
                  <p>{num}</p>
                </td>
              );
            })}
          </tr>
        </table>
      </div>
    );
  }
}

export default CalendarTitle;
