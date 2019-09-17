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
      pastEvent: [],
      searchListEvent: [],
      searchPastEvent: [],
      key: ""
    };
  }

  componentWillMount = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    await axios
      .get(this.props.baseUrl + "events/ongoing", config)
      .then(async response => {
        await this.setState({ listEvent: response.data });
        await this.setState({ searchListEvent: response.data });
      })
      .catch(error => {
        console.log(error);
      });
    await axios
      .get(this.props.baseUrl + "events/history", config)
      .then(async response => {
        await this.setState({ pastEvent: response.data });
        await this.setState({ searchPastEvent: response.data });
        await console.log("past evnet", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  search = e => {
    let keyword = e.target.value;
    let resultOnGoing = this.state.listEvent.filter(event => {
      let keywordMatch = event.event_name.search(keyword);
      return keywordMatch !== -1;
    });

    let resultHistory = this.state.pastEvent.filter(event => {
      let keywordMatch = event.event.event_name.search(keyword);
      return keywordMatch !== -1;
    });
    this.setState({
      searchListEvent: resultOnGoing,
      searchPastEvent: resultHistory
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Header></Header>
        <div className="container eventContent mobileView pb-5 animated fadeIn h-400 mbForFooter">
          <div className="text-center">
            <h1 className="text-centerm mt-3 mb-2">My Event</h1>
            <input
              type="text"
              placeholder="search event"
              className="mb-5"
              onChange={this.search}
            ></input>
          </div>
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
          >
            <Tab eventKey="home" title="On-Going">
              <div>
                {this.state.searchListEvent.map(value => {
                  console.log(value);
                  if (value.creator_confirmation === 1) {
                    if (value.place_name === null) {
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
                    }
                  }
                })}
              </div>
            </Tab>
            <Tab eventKey="profile" title="History">
              <div>
                {this.state.searchPastEvent.map(value => {
                  console.log(value);
                  return (
                    <div className="shadow">
                      <CollapseEvent
                        id={value.event.event_id}
                        eventName={value.event.event_name}
                        creatorName={value.event.creator_name}
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
