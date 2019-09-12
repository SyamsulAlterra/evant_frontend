import React from "react";
import CalendarPage from "./CalendarPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CalendarDetail from "../components/CalendarDetail";
import FotoProfil from "../components/FotoProfil";

class HomePage extends React.Component {
  render() {
    return (
      <div className="HomePage">
        <Header></Header>
        <FotoProfil></FotoProfil>
        <CalendarPage></CalendarPage>
        <CalendarDetail></CalendarDetail>
        <Footer></Footer>
      </div>
    );
  }
}

export default HomePage;
