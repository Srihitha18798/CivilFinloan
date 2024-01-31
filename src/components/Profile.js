import { Button, InputLabel, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Navbar from "./Navbar";
import { UserContext } from "../UserContext";
import axios from "axios";

const JSON_SERVER_URL = "http://localhost:5000/members";

const Profile = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const getData = async (e) => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?userID=${user}`);
        console.log(response);
        if (response.data.length === 1) {
          console.log("profile", response.data[0]);
          setProfile(response.data[0]);
        } else {
          console.log("User not found");
          setSuccessMsg("");
        }
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setSuccessMsg("");
        setLoading(false);
      }
    };
    getData();
  }, [user]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const updatedData = { ...profile, ...data };
      console.log(updatedData);
      const response = await axios.put(
        `${JSON_SERVER_URL}/${profile.id}`,
        updatedData
      );
      console.log("PUT request response", response);
      if (response.status === 200) {
        setSuccessMsg("Profile updated Succesfully");
      } else {
        setSuccessMsg("");
      }
    } catch (error) {
      console.log("Error updating profile", error);
      setSuccessMsg("");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <h1 style={{ marginTop: "100px" }}>Loading....</h1>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {Object.keys(profile).length === 0 ? (
        <div style={{ marginTop: "100px" }}>Profile not found</div>
      ) : (
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
            <h2 style={{ fontSize: "1.8em" }}>Profile</h2>
          </div>
          <div>
            <InputLabel style={{ color: "black", paddingRight: "340px" }}>
              User Id:
            </InputLabel>
            <Controller
              name="userID"
              control={control}
              defaultValue={user}
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
              defaultValue={profile.mobile || ""}
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
              defaultValue={profile.password || ""}
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
            <InputLabel style={{ color: "black", paddingRight: "310px" }}>
              Full Name:
            </InputLabel>
            <Controller
              name="fullName"
              control={control}
              defaultValue={profile.fullName || ""}
              render={({ field }) => (
                <TextField fullWidth {...field}></TextField>
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
              Update
            </Button>
            <br />
            {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
          </div>
        </form>
      )}
    </>
  );
};

export default Profile;
