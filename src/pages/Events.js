import React from "react";
import CollapseEvent from "../components/CollapseEvents";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "unistore/react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
      <div>
        <Header></Header>
        <div className="container eventContent mobileView pb-5">
          <h1 className="text-center">My Event</h1>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Ongoing Event ({this.state.listEvent.length})
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div>
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
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Events History ({this.state.pastEvent.length})
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordionExample"
                  >
                    {this.state.pastEvent.map(value => {
                      return (
                        <div className="shadow">
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
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect("baseUrl")(Events);
