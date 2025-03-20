import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Agents from "./components/Agents";
import UploadCSV from "./components/UploadCSV";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>

        <Route path="/" element={
          token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} 
        />

        <Route path="/dashboard" element={
          token ? <Dashboard /> : <Navigate to="/" />} 
        />

        <Route path="/agents" element={
          token ? <Agents /> : <Navigate to="/" />}
        />

        <Route path="/upload" element={
          token ? <UploadCSV /> : <Navigate to="/" />} 
        />

      </Routes>
    </Router>
  );
}

export default App;