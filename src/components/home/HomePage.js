import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1> RHKDHV Cars</h1>
    <p>We simply give you the best cars with the best deals possible.</p>
    <p>
      Do you want to know more ? See the cars we have right now in stock with us
    </p>
    <Link to="cars" className="btn btn-primary btn-lg">
      See cars
    </Link>
  </div>
);

export default HomePage;
