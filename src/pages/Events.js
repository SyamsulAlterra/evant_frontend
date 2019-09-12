import React from "react";
import CollapseEvent from "../components/CollapseEvents";

class Events extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="accordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Ongoing Events
              </button>
            </h2>
          </div>

          <div
            id="collapseOne"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            {[...Array(2).keys()].map(index => {
              return (
                <div className="border">
                  <CollapseEvent id={index} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
