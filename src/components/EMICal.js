import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";

const JSON_SERVER_URL = "http://localhost:5000/allservices";

const EMICal = () => {
  const [emiVal, setEmiVal] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [success, setSuccess] = useState(false);
  const LoanType = [
    "Small Scale Business Loans",
    "Micro Finance",
    "Money Remittance",
  ];
  const [detail, setDetail] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    const months = data.tenure * 12;

    const monthInterestRate = interestRate / 12 / 100;

    const emi =
      (data.loanAmount *
        monthInterestRate *
        Math.pow(1 + monthInterestRate, months)) /
      (Math.pow(1 + monthInterestRate, months) - 1);
    console.log(Math.round(emi));
    setEmiVal(Math.round(emi));
    setSuccess(true);
  };

  useEffect(() => {
    const getData = async () => {
      const loan = watch("loanType");
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?type=${loan}`);
        const responseData = response.data[0];
        setDetail(responseData.detail);
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
  }, [watch("loanType")]);

  useEffect(() => {
    const selectDetail = detail.find((item) => item.type === watch("code"));
    if (selectDetail) {
      setInterestRate(selectDetail.rate);
    } else {
      console.log("code not found");
    }
  }, [watch("code")]);

  return (
    <>
      <Navbar></Navbar>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          color: "black",
          display: "flex",
          flexDirection: "column",
          marginTop: "100px",
          backgroundColor: "#f8f9fa",
          borderRaduis: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          width: "80%",
          maxWidth: "500px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ fontSize: "2em", color: "#0b8699" }}>EMI Calculator</h2>
        </div>
        <div>
          <p>(Please check minimum and maximum loan amount before checking)</p>
        </div>
        <br />
        <div>
          <InputLabel style={{ color: "black", paddingRight: "410px" }}>
            Loan Type:
          </InputLabel>
          <Controller
            name="loanType"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth>
                <Select {...field}>
                  {LoanType.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          ></Controller>
        </div>
        <br />
        <div>
          <InputLabel style={{ color: "black", paddingRight: "450px" }}>
            Code:
          </InputLabel>
          <Controller
            name="code"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth>
                <Select {...field}>
                  {detail.map((detailType, index) => (
                    <MenuItem key={index} value={detailType.type}>
                      {detailType.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          ></Controller>
        </div>
        <br />
        <div>
          <InputLabel style={{ color: "black", paddingRight: "390px" }}>
            Loan Amount:
          </InputLabel>
          <Controller
            name="loanAmount"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                error={!!errors.loanAmount}
                helperText={errors.loanAmount ? "Loan Amount is required." : ""}
                FormHelperTextProps={{
                  style: {
                    color: "red",
                  },
                }}
              ></TextField>
            )}
          ></Controller>
        </div>
        <br />
        <div>
          <InputLabel style={{ color: "black", paddingRight: "440px" }}>
            Tenure:
          </InputLabel>
          <Controller
            name="tenure"
            type="number"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                error={!!errors.tenure}
                helperText={errors.tenure ? "Tenure is required." : ""}
                FormHelperTextProps={{
                  style: {
                    color: "red",
                  },
                }}
              ></TextField>
            )}
          ></Controller>
        </div>
        <br />
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              color: "black",
              marginTop: "20px",
              backgroundColor: "#ffc107",
            }}
          >
            Submit
          </Button>
          <br />
          {success && (
            <p style={{ color: "#0b8699" }}>
              The estimate EMI amount is Rs. {emiVal}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default EMICal;
