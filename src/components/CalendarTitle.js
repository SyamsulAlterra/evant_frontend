import React from "react";

class CalendarTitle extends React.Component {
  render() {
    return (
      <div className="calendarGrid centering">
        <table>
          <tr>
            {/* one row of day */}
            {["S", "M", "T", "W", "T", "F", "S"].map(value => {
              return (
                <td className="p-0">
                  <div className="borad">
                    <div className="calendarCell border text-center py-0 m-1 px-0">
                      <p className="px-2 m-0 calendarCell bgBiruMuda text-white">
                        {value}
                      </p>
                    </div>
                  </div>
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
