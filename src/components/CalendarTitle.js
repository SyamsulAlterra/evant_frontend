import React from "react";

class CalendarTitle extends React.Component {
  render() {
    return (
      <div className="calendarGrid centering">
        <table>
          <tr>
            {["S", "M", "T", "W", "T", "F", "S"].map(value => {
              return (
                <td className="p-0">
                  <div className="borad">
                    <div className="calendarCell border text-center py-1 m-1 px-0">
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
      // <div className="calendarTitle m-2">
      //   <table>
      //     <tr>
      //       {["S", "M", "T", "W", "T", "F", "S"].map(num => {
      //         return (
      //           <td className="calendarCell text-right text-white bg-dark border px-2 m-1">
      //             <p>{num}</p>
      //           </td>
      //         );
      //       })}
      //     </tr>
      //   </table>
      // </div>
    );
  }
}

export default CalendarTitle;
