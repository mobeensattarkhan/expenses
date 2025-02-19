import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./Components/Authentication-page/AuthForm";
import Dashboard from "./Components/Dashborad/Dashboard";
import Expenses from "./Components/Expenses/Expenses";
import Sidebar from "./Components/Sidebar/Sidebar";
import Trips from "./Components/Trips/Trips";
import Approvals from "./Components/Approvals/Approvals";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./routes/ProjectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route - Login Page */}
          <Route path="/" element={<AuthForm />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <Dashboard />
                </div>
              }
            />
            <Route
              path="/expenses"
              element={
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <Expenses />
                </div>
              }
            />
            <Route
              path="/trips"
              element={
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <Trips />
                </div>
              }
            />
          </Route>

          {/* Unprotected Route - Approvals */}
          <Route
            path="/approvals"
            element={
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Approvals />
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
