import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Box, Typography, AppBar, Toolbar } from "@mui/material";
import { useRecoilState } from "recoil";
import {isLogin} from "../store/atoms"

function Navbar() {
  const [state] = useRecoilState(isLogin);

  return (
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
            gap: "40px",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <NavLink
            to="/"
            style={({ isActive }) => ({
              textDecoration: "none",
              fontSize: "20px",
              fontWeight: "bold",
              color: isActive ? "#004aad" : "#000",
              borderBottom: isActive ? "2px solid #004aad" : "none",
              transition: "all 0.3s ease",
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/vehicle"
            style={({ isActive }) => ({
              textDecoration: "none",
              fontSize: "20px",
              fontWeight: "bold",
              color: isActive ? "#004aad" : "#000",
              borderBottom: isActive ? "2px solid #004aad" : "none",
              transition: "all 0.3s ease",
            })}
          >
            Vehicle
          </NavLink>
          <NavLink
            to="/blog"
            style={({ isActive }) => ({
              textDecoration: "none",
              fontSize: "20px",
              fontWeight: "bold",
              color: isActive ? "#004aad" : "#000",
              borderBottom: isActive ? "2px solid #004aad" : "none",
              transition: "all 0.3s ease",
            })}
          >
            Blog
          </NavLink>
          <NavLink
            to="/aboutus"
            style={({ isActive }) => ({
              textDecoration: "none",
              fontSize: "20px",
              fontWeight: "bold",
              color: isActive ? "#004aad" : "#000",
              borderBottom: isActive ? "2px solid #004aad" : "none",
              transition: "all 0.3s ease",
            })}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contactus"
            style={({ isActive }) => ({
              textDecoration: "none",
              fontSize: "20px",
              fontWeight: "bold",
              color: isActive ? "#004aad" : "#000",
              borderBottom: isActive ? "2px solid #004aad" : "none",
              transition: "all 0.3s ease",
            })}
          >
            Contact Us
          </NavLink>
        </Box>

        {/* Buttons (Login and Sign Up) with spacing */}
        <Box sx={{ display: "flex", gap: "15px" }}>
          {state ? (
            <Button
              variant="contained"
              color="primary"
              component={NavLink}
              to="/profile"
              sx={{
                textTransform: "none",
                backgroundColor: "#004aad",
                "&:hover": { backgroundColor: "#003580" },
                fontSize: "14px",
                padding: "8px 16px",
              }}
            >
              User Profile
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                component={NavLink}
                to="/login"
                sx={{
                  textTransform: "none",
                  borderColor: "#004aad",
                  color: "#004aad",
                  fontSize: "14px",
                  padding: "8px 16px",
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
                  fontSize: "14px",
                  padding: "8px 16px",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;