import React from "react";
import { connect } from "unistore/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Axios from "axios";
import avatar from "../images/avatar.png";

class EventHistoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        event_name: "",
        creator_name: ""
      },
      participant: [],
      title: "",
      startDate: "",
      endDate: ""
    };
  }

  formatDate = date => {
    const dateDictionary = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    if (date === undefined) {
      return "halo";
    } else if (date === null) {
      return date;
    }
    let d = date.slice(0, 2);
    let m = parseInt(date.slice(3, 5));
    let y = date.slice(6, 10);
    return `${dateDictionary[m - 1]} ${d}, ${y}`;
  };
  componentWillMount = async () => {
    let config = {
      url:
        this.props.baseUrl + "events/" + this.props.match.params.id.toString(),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    await this.setState({
      event: response.data,
      startDate: response.data.start_date,
      endDate: response.data.end_date
    });

    config = {
      url:
        this.props.baseUrl +
        "events/list_of_participant/" +
        this.props.match.params.id.toString(),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    response = await Axios(config);
    await this.setState({ participant: response.data });
    if (
      this.state.startDate === null ||
      this.state.startDate === undefined ||
      this.state.startDate === ""
    ) {
      this.setState({
        title: `don't have match date`,
        startDate: '-'
      })
    } else if (
      this.state.event.place_name === null ||
      this.state.event.place_name === undefined ||
      this.state.event.place_name === ""
    ) {
      this.setState({ title: `don't have match place` });
    } else {
      this.setState({ title: `Success` });
    }
    console.log(this.state.startDate)
  };
  render() {
    console.log(this.state.event);
    return (
      <div className="eventHistory">
        <Header></Header>
        <div className="container mobileView">
          <h3 className="text-center m-0 mt-3">
            <b>{this.state.event.event_name}</ b>
            <br></br>
            <h6>{this.state.title}</h6>
          </h3>
          <hr />
          <h6 className="text-center m-0">
            Creator:  <b>@{this.state.event.creator_username}</b>
          </h6>
          <br></br>
          <h6 className="text-center m-0">
            Category:  {this.state.event.category}
          </h6>
          <br></br>
          <h6 className="text-center m-0">
            Date:{" "}
            {`${this.state.startDate === "-" ? this.state.startDate : this.formatDate(this.state.startDate)} - ${this.state.startDate === "-" ?
              this.state.startDate : this.formatDate(this.state.endDate)}`}
          </h6>
          <div className="participant m-3 border shadow rounded">
            {this.state.participant.map((user, index) => {
              return (
                <div className="mx-5 my-2">
                  <table>
                    <tr>
                      <td className="p-2 w-25">
                        <img src={avatar} alt="" className="avatar"></img>
                      </td>
                      <td className="p-2 w-75">
                        <p className="m-0">{user.fullname}</p>
                        <p className="m-0">@{user.username}</p>
                      </td>
                    </tr>
                  </table>
                </div>
              );
            })}
          </div>
          <div className="category">
            <h3 className="text-center">Venue:</h3>
          </div>
          <div className="text-center rounded mb-3">
            <table className="border shadow rounded">
              <div className="m-3">
                <tr>
                  <td className="p-3">
                    <p className="text-center m-0 centering">
                      {this.state.event.place_name}
                    </p>
                    <p className="text-center m-0 centering">
                      {this.state.event.location}
                    </p>
                  </td>
                </tr>
              </div>
            </table>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect("baseUrl")(EventHistoryDetail);
