import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";

const JSON_SERVER_URL = "http://localhost:5000/allservices";

const WM = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?code=WM`);
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
              <ul>
                <li
                  style={{
                    fontSize: "1em",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {detailItem}
                </li>
              </ul>
            ))}
        </div>
      </div>
    </>
  );
};

export default WM;
