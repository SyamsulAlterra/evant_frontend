import React from "react";
import Footer from "../components/Footer";
import icon404 from "../images/logo_transparent.png";

export default function NotFound() {
  return (
    <div className="">
      <div className="container mobileView notFound animated fadeIn my-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <img src={icon404} className="w-100" height="300px" />
            <h1>Page not found</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
