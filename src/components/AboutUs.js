import React from "react";
import Navbar from "./Navbar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar></Navbar>
      <div style={{ marginTop: "100px", padding: "0 10px" }}>
        <h1 style={{ marginRight: "5%", marginLeft: "5px" }}>About Us</h1>
        <p
          style={{
            marginRight: "10px",
            fontSize: "1.5em",
            marginLeft: "5px",
            textAlign: "justify",
          }}
        >
          Civil Finloan is a finance management company which is providing the
          extensive array of services by providing loans to citizens. Money
          transfer, wealth management and also leading on providing micro loans
          to agriculture and small businesses in the rural regions.
        </p>
        <br />
        <br />
        <Button
          style={{
            marginRight: "5%",
            marginLeft: "5px",
            color: "black",
            backgroundColor: "#ffc107",
          }}
          onClick={() => navigate("/Home")}
        >
          Explore Home
        </Button>
      </div>
    </>
  );
};

export default AboutUs;
