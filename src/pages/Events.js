import React from "react";
import CollapseEvent from "../components/CollapseEvents";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "unistore/react";
import axios from "axios";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listEvent: [],
      pastEvent: []
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
      .then(async response => {
        await this.setState({ listEvent: response.data });
      })
      .catch(error => {
        console.log(error);
      });
    await axios
      .get(this.props.baseUrl + "events/history", config)
      .then(async response => {
        await this.setState({ pastEvent: response.data });
        console.log(this.state.pastEvent);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container eventContent mobileView p-0">
        <Header></Header>
        <h1 className="text-center">My Event</h1>
        <div className="accordion ongoingEvent" id="accordionExample">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h2 className="mb-0">
                <button
                  className="btn btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Ongoing Events ({this.state.listEvent.length})
                </button>
              </h2>
            </div>

            <div
              id="collapseOne"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              {this.state.listEvent.map(value => {
                return (
                  <div className="border">
                    <CollapseEvent
                      id={value.event_id}
                      creatorName={value.creator_name}
                      eventName={value.event_name}
                      category={value.category}
                      startDateParameter={value.start_date_parameter}
                      endDateParameter={value.end_date_parameter}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="accordion pastEvent" id="accordionExample">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h2 className="mb-0">
                <button
                  className="btn btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  Events History ({this.state.pastEvent.length})
                </button>
              </h2>
            </div>

            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              {this.state.pastEvent.map(value => {
                return (
                  <div className="border">
                    <CollapseEvent
                      id={value.event_id}
                      eventName={value.event_name}
                      category={value.category}
                      startDateParameter={value.start_date_parameter}
                      endDateParameter={value.end_date_parameter}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect("baseUrl")(Events);
