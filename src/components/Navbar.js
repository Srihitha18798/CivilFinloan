import React from "react";
import "../components/Navbar.css";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <ul className="navbar-links navbar-main-links">
          <Link
            to="/Home"
            style={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: "1.5em",
              paddingRight: "10px",
            }}
          >
            Civil Finloan
          </Link>
          &nbsp; &nbsp;
          <Link to="/AboutUs">About Us</Link> &nbsp; &nbsp;
          <li className="navbar-dropdown">
            <Link className="nav-link">
              Services
              <ArrowDropDownIcon className="dropdown-icon"></ArrowDropDownIcon>
            </Link>
            <ul className="dropdown-content">
              <Link to="/Service/MF">Micro Finance</Link>
              <Link to="/Service/SCB">Small Scale Business Loans</Link>
              <Link to="/Service/MR">Money Remittance</Link>
              <Link to="/Service/WM">Wealth Management</Link>
            </ul>
          </li>
          &nbsp; &nbsp;
        </ul>
      </div>

      <ul className="navbar-links navbar-secondary-links">
        <Link to="/EMICal">EMI Calculator</Link> &nbsp; &nbsp;
        <Link to="/SignUp">Join as a Member</Link>&nbsp; &nbsp;
        <Link to="/Profile">Update Profile</Link>&nbsp; &nbsp;
        <Link to="/Login">Login</Link>&nbsp; &nbsp;
      </ul>
    </div>
  );
};

export default Navbar;
