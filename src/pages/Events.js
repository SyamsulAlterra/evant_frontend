import React from "react";
import CollapseEvent from "../components/CollapseEvents";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "unistore/react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TabContainer from "react-bootstrap/TabContainer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

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
        await console.log("past evnet", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state.pastEvent);
    return (
      <div>
        <Header></Header>
        <div className="container eventContent mobileView pb-5 animated fadeIn h-400 mbForFooter">
          <h1 className="text-center">My Event</h1>

          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
          >
            <Tab eventKey="home" title="On-Going">
              <div>
                {this.state.listEvent.map(value => {
                  return (
                    <div className="shadow">
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
            </Tab>
            <Tab eventKey="profile" title="History">
              <div>
                {this.state.pastEvent.map(value => {
                  console.log(value);
                  return (
                    <div className="shadow">
                      <CollapseEvent
                        id={value.event.event_id}
                        eventName={value.event.event_name}
                        creatorName={value.creator_name}
                        category={value.event.category}
                        startDateParameter={value.event.start_date_parameter}
                        endDateParameter={value.event.end_date_parameter}
                      />
                    </div>
                  );
                })}
              </div>
            </Tab>
          </Tabs>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect("baseUrl")(Events);
