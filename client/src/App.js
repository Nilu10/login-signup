// client/src/App.js
import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedComponent from "./ProtectedComponent";
import Home from "./Home";

function App() {
  // useEffect(()=>{
  //   axios.get("http://loc")
  // })
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/protected" element={<ProtectedComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
