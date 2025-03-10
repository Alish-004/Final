import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const CarDetailPage = () => {
  // State for start and end locations
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  // Sample locations
  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA",
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Car Information Card */}
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Luxury Car"
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Mercedes-Benz S-Class
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Luxury Sedan
          </Typography>
          <Typography variant="body1" paragraph>
            Experience the epitome of luxury with the Mercedes-Benz S-Class. This
            vehicle comes equipped with advanced technology, a smooth driving
            experience, and unmatched comfort.
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
            Price per day: Rs. 15,000
          </Typography>
        </CardContent>
      </Card>

      {/* Trip Details */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Trip Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Start Location"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              variant="outlined"
              sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="End Location"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              variant="outlined"
              sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {/* Payment Options */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Payment Options
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                textAlign: "center",
                py: 2,
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Credit Card
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                textAlign: "center",
                py: 2,
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Debit Card
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                textAlign: "center",
                py: 2,
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  PayPal
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Booking Button */}
      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            py: 1.5,
            px: 4,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          Book Now
        </Button>
      </Box>
    </Container>
  );
};

export default CarDetailPage;