import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Home from "./components/Home";
import EMICal from "./components/EMICal";
import AboutUs from "./components/AboutUs";
import SCB from "./components/services/SCB";
import WM from "./components/services/WM";
import MR from "./components/services/MR";
import MF from "./components/services/MF";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/SignUp" element={<SignUp />}></Route>
            <Route exact path="/Profile" element={<Profile />}></Route>
            <Route exact path="/Home" element={<Home />}></Route>
            <Route exact path="/EMICal" element={<EMICal />}></Route>
            <Route exact path="/AboutUs" element={<AboutUs />}></Route>
            <Route exact path="/Service/SCB" element={<SCB />}></Route>
            <Route exact path="/Service/WM" element={<WM />}></Route>
            <Route exact path="/Service/MR" element={<MR />}></Route>
            <Route exact path="/Service/MF" element={<MF />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
