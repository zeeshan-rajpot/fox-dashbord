// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Home/Home.jsx";
import Program from "./pages/Program/Program.jsx";
import Users from "./pages/Users/Users.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import ProgramDetails from "./pages/Program/ProgramDetails.jsx";
import Tab from "./pages/Tab/Tab.jsx";
import Exercise from "./pages/Exercise/Exercise.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/program" element={<Program />} />
        <Route path="/Exercise" element={<Exercise />} />
        <Route path="/program/programdetails" element={<ProgramDetails/>} />
        <Route path="/tab" element={<Tab />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
