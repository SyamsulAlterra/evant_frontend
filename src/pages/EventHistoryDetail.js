import React from "react";
import { connect } from "unistore/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Axios from "axios";

class EventHistoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
  }
  componentDidMount = async () => {
    let config = {
      url:
        this.props.baseUrl +
        "event/list_of_participant/" +
        this.props.match.params.id.toString(),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    console.log(config);

    let response = await Axios(config);
    await this.setState({ event: response.data });
    console.log(response.data);
  };
  render() {
    return (
      <div className="eventHistory">
        <Header></Header>
        <h3 className="text-center m-0 mt-3">$Event Title</h3>
        <p className="text-center m-0">===========================</p>
        <h6 className="text-center m-0">creator: $creator</h6>
        <h6 className="text-center m-0">category: $category</h6>
        <h6 className="text-center m-0">date: $start - $end</h6>
        <div className="participant m-3 border">
          {[...Array(5).keys()].map((value, index) => {
            return (
              <div className="mx-5 my-2">
                <table>
                  <tr>
                    <td className="p-2 w-25">$images</td>
                    <td className="p-2 w-75">
                      <p className="m-0">$fullname #{index}</p>
                      <p className="m-0">@$username #{index}</p>
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
