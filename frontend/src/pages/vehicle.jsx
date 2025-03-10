import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VehicleCard from "../components/VehicleCard";

const theme = createTheme();

export default function VehicleRental() {
  // Add state for vehicles
  const [vehicles, setVehicles] = useState([]);

  // Fetch vehicles from backend when component mounts
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch("http://localhost:4000/vehicle/get");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        console.log(data)
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    }
    fetchVehicles();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          Choose your Favourite vehicle
        </Typography>
        <Grid container spacing={4}>
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
