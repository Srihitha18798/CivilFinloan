import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";

const JSON_SERVER_URL = "http://localhost:5000/allservices";

const MF = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?code=MF`);
        console.log(response);
        if (response.data.length === 1) {
          setData(response.data[0]);
        } else {
          console.log("Data not found");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getData();
  });

  return (
    <>
      <Navbar></Navbar>
      <div
        style={{
          marginTop: "100px",
          marginLeft: "20px",
          textAlign: "left",
        }}
      >
        <h1 style={{ fontSize: "4em" }}>{data.type}</h1>
        <p style={{ fontSize: "1.5em" }}>{data.description}</p>
        <hr />
        <div>
          {data.detail &&
            data.detail.map((detailItem, index) => (
              <div>
                <p
                  style={{
                    fontSize: "1em",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  Type: {detailItem.type}
                </p>
                <ul style={{ listStylType: "round", paddingLeft: "20px" }}>
                  <li>
                    <span style={{ fontWeight: "bold" }}>Minimum Amount: </span>
                    <span>Rs. {detailItem.min}</span>
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>Maximum Amount: </span>
                    <span>Rs. {detailItem.max}</span>
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>Tenure: </span>
                    <span>{detailItem.tenure} (days/month)</span>
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MF;
