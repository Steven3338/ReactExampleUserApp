import React from "react";
import picture from "./PictureFromHotAirBalloon.jpg";
import "./home.css";

const Home = () => {
  return (
    <div>
      <h1>Steve's Demo Website</h1>
      <p>
        This website was build using React. Example data does not include
        information on real people.
      </p>
      <p>
        Backend services were also created by Steve, using ASP.NET Web APIs, SQL
        Server, and Entity Framework.
      </p>
      <p>
        Client services are hosted on Heroku and backend services are hosted on
        Azure
      </p>
      <img src={picture} className="banner" />
    </div>
  );
};

export default Home;
