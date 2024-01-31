import React from "react";
import Navbar from "./Navbar";
import bg from "../bg_1200x453.jpg";

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "50px", maxWidth: "100%", overflow: "hidden" }}>
        <img
          src={bg}
          alt=""
          style={{ height: "auto", width: "100%", display: "block" }}
        ></img>
      </div>
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#0b8699", textAlign: "center" }}>
          {" "}
          An hub for your Finiancial needs
        </h2>
        <p style={{ textAlign: "center" }}>
          We offer the extensive array of services by providing loans to
          citizens, Money transfer, <br />
          wealth management and also leading on providing micro loans to
          agriculture and <br />
          small businesses in the rural regions.
        </p>
      </div>
    </>
  );
};

export default Home;
