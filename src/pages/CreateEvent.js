import React from "react";
import axios from "axios";
import { connect } from "unistore/react";

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "holiday",
      eventName: ""
    };
  }

  handleCategory = async e => {
    let inputCategory = e.target.value;
    await this.setState({ category: inputCategory });
    console.log("category", this.state.category);
  };

  handleEventName = async e => {
    let inputEventName = e.target.value;
    await this.setState({ eventName: inputEventName });
    console.log("eventname", this.state.eventName);
  };

  createEvent = async e => {
    e.preventDefault();
    const self = this;
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    await axios
      .post(
        this.props.baseUrl + "events",
        {
          category: self.state.category,
          event_name: self.state.eventName
        },
        config
      )
      .then(response => {
        console.log(response);
        self.props.history.push("/home");
      });
  };

  render() {
    return (
      <div className="createEvent-content">
        <h1 className="text-center">CREATE EVENT PAGE</h1>
        <div className="container mobileView">
          <div className="row justify-content-center mb-3">
            <div className="event-name col-8 text-center">
              <label for="exampleFormControlSelect1">Event Name</label>
              <br />
              <input
                type="text"
                placeholder="event name"
                onChange={this.handleEventName}
              />
            </div>
          </div>
          <div className="row justify-content-center mb-3">
            <div className="category-select col-8 text-center">
              <label for="category">Select Category</label>
              <span>
                <select
                  className="form-control"
                  id="category"
                  onChange={this.handleCategory}
                >
                  <option selected value="vacation">
                    Holiday
                  </option>
                  <option value="eat">Eat Out</option>
                  <option value="hiking">Hiking</option>
                </select>
              </span>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="search-user col-8 text-center">
              <input type="text" placeholder="search"></input>
            </div>
            <div className="button-add col-4 text-center">
              <button className="btn m-1">invite user</button>
            </div>
          </div>
          <div className="row justify-content-center">
            {[...Array(5).keys()].map(value => {
              return (
                <div className="col-12 text-center">
                  Invited User {value}
                  <br />
                </div>
              );
            })}
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-success m-1">cancel</button>
            <button className="btn btn-success m-1" onClick={this.createEvent}>
              create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect("baseUrl")(CreateEvent);
