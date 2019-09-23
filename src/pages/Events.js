import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CollapseEvent from "../components/CollapseEvents";

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
    // to get ongoing and history events from the database
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

  // method for search
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
    return (
      <div>
        <Header />
        <div className="container eventContent mobileView pb-5 animated fadeIn h-400 mbForFooter">
          {/* search bar for events */}
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
            {/* show ongoing events */}
            <Tab eventKey="home" title="On-Going">
              <div>
                {this.state.searchListEvent.map(value => {
                  if (value.creator_confirmation === 1) {
                    if (value.place_name === null) {
                      return (
                        <div className="row justify-content-center">
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
            {/* show history events */}
            <Tab eventKey="profile" title="History">
              <div>
                {this.state.searchPastEvent.map(value => {
                  console.log(value);
                  return (
                    <div className="row justify-content-center">
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
        <Footer />
      </div>
    );
  }
}

export default connect("baseUrl")(Events);
