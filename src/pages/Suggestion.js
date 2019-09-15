import React from "react";
import { connect } from "unistore/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Axios from "axios";
import avatar from "../images/avatar.png";

class Suggestion extends React.Component {
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
    await this.setState({ participant: response.data });
  };
  render() {
    return (
      <div className="eventHistory">
        <Header></Header>
        <div className="container mobileView">
          <h3 className="text-center m-0 mt-3">
            {this.state.event.event_name}
          </h3>
          <p className="text-center m-0">===========================</p>
          <h6 className="text-center m-0">
            creator: @{this.state.event.creator_username}
          </h6>
          <h6 className="text-center m-0">
            category: {this.state.event.category}
          </h6>
          <h6 className="text-center m-0">
            Suggestion date: <br></br>
            {this.state.event.start_date} - {this.state.event.end_date}
          </h6>
          <div className="participant m-3 border">
            {this.state.participant.map((user, index) => {
              return (
                <div className="mx-3 my-2 border">
                  <table className="mx-5">
                    <tr>
                      <td className="p-2 w-25">
                        <img alt="" src={avatar} className="avatar"></img>
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
            <h3 className="text-center">Place Suggestions:</h3>
          </div>
          <div className="text-center mb-3 border p-3 places">
            <table className="">
              {[...Array(4).keys()].map(num => {
                return (
                  <div className="m-3">
                    <tr>
                      <td className="p-3 border">
                        <img alt="" src={avatar} className="venue"></img>
                        <p className="text-center m-0 centering">
                          $places name and address
                        </p>
                        {/* <br></br> */}
                        <button className="btn btn-success">Choose</button>
                      </td>
                    </tr>
                  </div>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default connect("baseUrl")(Suggestion);
