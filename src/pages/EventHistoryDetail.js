import React from "react";
import { connect } from "unistore/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Axios from "axios";

class EventHistoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        event_name: "",
        creator_name: ""
      },
      participant: []
    };
  }
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
    await this.setState({ event: response.data });

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
    // console.log(response.data);
    await this.setState({ participant: response.data });
  };
  render() {
    return (
      <div className="eventHistory">
        <Header></Header>
        <h3 className="text-center m-0 mt-3">{this.state.event.event_name}</h3>
        <p className="text-center m-0">===========================</p>
        <h6 className="text-center m-0">
          creator: @{this.state.event.creator_username}
        </h6>
        <h6 className="text-center m-0">
          category: {this.state.event.category}
        </h6>
        <h6 className="text-center m-0">
          date: {this.state.event.start_date} - {this.state.event.end_date}
        </h6>
        <div className="participant m-3 border">
          {this.state.participant.map((user, index) => {
            return (
              <div className="mx-5 my-2">
                <table>
                  <tr>
                    <td className="p-2 w-25">$images</td>
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
        <div className="text-center mb-3">
          <table className="border">
            <tr>
              <td className="p-3">
                <p className="text-center m-0 centering">$places image</p>
              </td>
            </tr>
          </table>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect("baseUrl")(EventHistoryDetail);
