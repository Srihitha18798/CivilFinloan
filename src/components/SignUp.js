import { Button, InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Navbar from "./Navbar";
import axios from "axios";

const JSON_SERVER_URL = "http://localhost:5000/members";

const SignUp = () => {
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(JSON_SERVER_URL, data);
      console.log("User added successfully", response);
      setErrMsg("");
      setSuccessMsg("User added succesfully");
    } catch (error) {
      console.log("error", error);
      setErrMsg("Error adding user");
      setSuccessMsg("");
    }
  };

  return (
    <>
      <Navbar />

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
          maxWidth: "400px",
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
          <h2 style={{ fontSize: "1.8em" }}>Join as a Member</h2>
        </div>
        <div>
          <InputLabel style={{ color: "black", paddingRight: "340px" }}>
            User Id:
          </InputLabel>
          <Controller
            name="userID"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                error={!!errors.userID}
                helperText={errors.userID ? "Id field is required" : ""}
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
          <InputLabel style={{ color: "black", paddingRight: "280px" }}>
            Mobile Number:
          </InputLabel>
          <Controller
            name="mobile"
            type="number"
            defaultValue=""
            control={control}
            rules={{ required: true, pattern: /^[0-9]{10}$/ }}
            render={({ field }) => (
              <TextField
                type="number"
                fullWidth
                {...field}
                error={!!errors.mobile}
                helperText={
                  errors.mobile ? "Mobile Number should have 10 digits" : ""
                }
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
          <InputLabel style={{ color: "black", paddingRight: "320px" }}>
            Password:
          </InputLabel>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true, minLength: 5, maxLength: 10 }}
            render={({ field }) => (
              <TextField
                fullWidth
                type="password"
                {...field}
                error={!!errors.password}
                helperText={
                  errors.password
                    ? "Password must be 5 to 10 characters long."
                    : ""
                }
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
            Sign Up
          </Button>
          <br />
          {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
          {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
        </div>
      </form>
    </>
  );
};

export default SignUp;
