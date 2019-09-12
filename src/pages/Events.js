import React from "react";
import CollapseEvent from "../components/CollapseEvents";
import { connect } from "unistore/react";
import axios from "axios";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listEvent: []
    };
  }

  componentDidMount = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    await axios
      .get(this.props.baseUrl + "events/ongoing", config)
      .then(response => {
        console.log(response.data);
        this.setState({ listEvent: response.data });
        console.log("state list event", this.state.listEvent);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
            {this.state.listEvent.map((value, index) => {
              return (
                <div className="border">
                  <CollapseEvent
                    id={value.event_id}
                    eventName={value.event_name}
                    category={value.category}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect("baseUrl")(Events);
