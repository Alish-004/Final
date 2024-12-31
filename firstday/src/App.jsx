import React from "react";
import Homepage from "./pages/home";
import LoginPage from "./pages/Login";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import VehicleRental from "./pages/vehicle";
import AboutUs from "./pages/Aboutus";
import { Typography, Button, Box, Toolbar, AppBar } from "@mui/material";

import ContactUs from "./pages/contactus";
import BlogPage from "./pages/blog";
import "./App.css"; // Global CSS file for scrollbar adjustment

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Navbar */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Logo Section */}
            <Box display="flex" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#004aad" }}>
                Vehicle Rental
              </Typography>
            </Box>

            {/* Navigation Links Section (Centered) */}
            <Box
              sx={{
                display: "flex",
                gap: "40px", // Gap between links
                alignItems: "center",
                justifyContent: "center", // Center the links
                flexGrow: 1, // Ensure links take up remaining space and center them
              }}
            >
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  fontSize: "20px", // Increased font size
                  fontWeight: "bold",
                  color: isActive ? "#004aad" : "#000", // Active link color (purple)
                  borderBottom: isActive ? "2px solid #004aad" : "none", // Underline on active link
                  transition: "all 0.3s ease",
                })}
              >
                Home
              </NavLink>
              <NavLink
                to="/vehicle"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  fontSize: "20px", // Increased font size
                  fontWeight: "bold",
                  color: isActive ? "#004aad" : "#000", // Active link color (purple)
                  borderBottom: isActive ? "2px solid #004aad" : "none", // Underline on active link
                  transition: "all 0.3s ease",
                })}
              >
                Vehicle
              </NavLink>
              <NavLink
                to="/blog"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  fontSize: "20px", // Increased font size
                  fontWeight: "bold",
                  color: isActive ? "#004aad" : "#000", // Active link color (purple)
                  borderBottom: isActive ? "2px solid #004aad" : "none", // Underline on active link
                  transition: "all 0.3s ease",
                })}
              >
                Blog
              </NavLink>
              <NavLink
                to="/aboutus"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  fontSize: "20px", // Increased font size
                  fontWeight: "bold",
                  color: isActive ? "#004aad" : "#000", // Active link color (purple)
                  borderBottom: isActive ? "2px solid #004aad" : "none", // Underline on active link
                  transition: "all 0.3s ease",
                })}
              >
                About Us
              </NavLink>
              <NavLink
                to="/contactus"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  fontSize: "20px", // Increased font size
                  fontWeight: "bold",
                  color: isActive ? "#004aad" : "#000", // Active link color (purple)
                  borderBottom: isActive ? "2px solid #004aad" : "none", // Underline on active link
                  transition: "all 0.3s ease",
                })}
              >
                Contact Us
              </NavLink>
            </Box>

            {/* Buttons (Login and Sign Up) with spacing */}
            <Box sx={{ display: "flex", gap: "15px" }}>
              <Button
                variant="outlined"
                color="primary"
                component={NavLink}
                to="/login"
                sx={{
                  textTransform: "none",
                  borderColor: "#004aad",
                  color: "#004aad",
                  fontSize: "14px", // Smaller font size for buttons
                  padding: "8px 16px", // Smaller padding for buttons
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={NavLink}
                to="/signup"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#004aad",
                  "&:hover": { backgroundColor: "#003580" },
                  fontSize: "14px", // Smaller font size for buttons
                  padding: "8px 16px", // Smaller padding for buttons
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Routes */}
        <div style={{ marginTop: "80px" }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/vehicle" element={<VehicleRental />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
