import React from "react";
import Axios from "axios";
import Joyride from "react-joyride";
import { connect } from "unistore/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FotoProfil from "../components/FotoProfil";
import Calendar from "../components/Calendar";
import { actions } from "../Store";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // state for onboarding
      run: false,
      steps: [
        {
          content: "Decide When, Where, and Who",
          locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
          placement: "center",
          target: "body",
          title: <h2>Welcome to Evant!</h2>
        },
        {
          content: "Click here to plan events with your friends",
          placement: "bottom",
          target: ".boarding-create-event",
          title: "Create events"
        },
        {
          content: "just click on a date to mark them as your free day",
          placement: "top",
          spotlightPadding: 20,
          target: ".boarding-mark-calendar",
          title: "Mark your available dates"
        },
        {
          content: "all your future events will appear here",
          placement: "bottom",
          spotlightPadding: 20,
          target: ".boarding-marked-calendar",
          title: "Your planned events"
        },
        {
          content: "click here if you want to go back to this page",
          placement: "top",
          target: ".my-first-step-home",
          title: "Home"
        },
        {
          placement: "top",
          content: "Click here to see all of your events!",
          target: ".my-second-step-events",
          title: "Events"
        },
        {
          placement: "top",
          content: "accept and reject invitations",
          target: ".my-third-step-invitations",
          title: "Invitations"
        },
        {
          content: "see and edit your profile here",
          placement: "top",
          target: ".my-fourth-step-profile",
          title: "Profile"
        }
      ],
      status_first_login: localStorage.getItem("status_first_login")
    };
  }
  componentWillMount = async () => {
    this.setState({ display: true });
    // to check user's first login status to display onboarding or not
    if (
      localStorage.getItem("status_first_login") === 1 ||
      localStorage.getItem("status_first_login") === true ||
      localStorage.getItem("status_first_login") === "true"
    ) {
      this.setState({ run: true });
    }

    // to get all available dates to mark them on calendar
    let config = {
      url: this.props.baseUrl + "date",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    await this.props.setAvailableDatesOnGlobal(response.data);

    // to get all booked dates to mark them on calendar
    config = {
      url: this.props.baseUrl + "events/booked",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    response = await Axios(config);
    await this.props.setEventsAndBookedDatesOnGlobal(
      response.data.booked_event,
      response.data.all_booked_dates
    );

    this.props.allBookedDates.map(async date => {
      config = {
        url: this.props.baseUrl + "date",
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        data: {
          date: date
        }
      };

      await Axios(config);
    });
  };

  componentDidMount = async () => {
    // to set user's first login status to false
    let config = {
      url: this.props.baseUrl + "users/after_first_login",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config).then(() => {
      localStorage.setItem("status_first_login", false);
    });
  };

  render() {
    const { run, steps } = this.state;

    return (
      <div className="HomePage mbForFooter">
        <Header />
        {/* onboarding component */}
        <Joyride
          callback={this.handleJoyrideCallback}
          continuous={true}
          getHelpers={this.getHelpers}
          run={run}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              arrowColor: "#dfd9e2",
              backgroundColor: "#dfd9e2",
              // overlayColor: "rgba(79, 26, 0, 0.4)",
              primaryColor: "#000",
              textColor: "#000",
              width: 300,
              zIndex: 1000
            }
          }}
        />
        <FotoProfil photo={localStorage.getItem("photoUrl")}></FotoProfil>
        <Calendar />
        <Footer />
      </div>
    );
  }
}

export default connect(
  "baseUrl, allBookedDates",
  actions
)(HomePage);
