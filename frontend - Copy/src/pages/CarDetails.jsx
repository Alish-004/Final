import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Chip,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const CarDetailPage = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [hoursDifference, setHoursDifference] = useState(0);
  const { carId } = useParams();

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/vehicle/get/${carId}`);
        setVehicle(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load vehicle data. Please try again.");
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [carId]);

  // Calculate total price and hours difference
  useEffect(() => {
    if (vehicle && startDateTime && endDateTime) {
      const startDateObj = new Date(startDateTime);
      const endDateObj = new Date(endDateTime);
      const timeDifference = endDateObj - startDateObj; // Difference in milliseconds
      const hours = Math.ceil(timeDifference / (1000 * 60 * 60)); // Convert to hours
      setHoursDifference(hours);

      // Calculate price based on hours and hourly rate
      const price = hours * vehicle.pricePerHour;
      setTotalPrice(price);
    }
  }, [startDateTime, endDateTime, vehicle]);

  // Handle booking
  const handleBooking = async () => {
    if (!startDateTime || !endDateTime) {
      setNotification({
        open: true,
        message: "Please select both start and end date/time",
        severity: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/payment",
        { amount: totalPrice }, // Send the calculated amount in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNotification({
        open: true,
        message: "Booking successful! Redirecting to payment...",
        severity: "success",
      });

      // Redirect to the payment URL received from the API
      window.location.href = response.data.payment_url;
    } catch (error) {
      console.error("Error during payment:", error);
      setNotification({
        open: true,
        message: "Failed to process payment. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading vehicle details...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Navigation */}
      <Box display="flex" alignItems="center" mb={3}>
        <Button variant="outlined" sx={{ mr: 1 }} startIcon={<Typography>←</Typography>}>
          Back to Search
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Left Column - Vehicle Details */}
        <Grid item xs={12} md={8}>
          {/* Vehicle Image */}
          <Card sx={{ borderRadius: 2, overflow: "hidden", mb: 3, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="450"
              image={`http://localhost:4000/uploads/${vehicle.imageUrl.split("\\")[1]}`}
              alt={vehicle?.vehicleName}
            />
          </Card>

          {/* Vehicle Information */}
          <Card sx={{ borderRadius: 2, boxShadow: 3, mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                    {vehicle?.vehicleName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {vehicle?.type} • {vehicle?.model}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" paragraph>
                {vehicle?.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Vehicle Features */}
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Vehicle Features
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Company
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {vehicle?.company}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Fuel Type
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {vehicle?.fuelType}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Seating Capacity
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {vehicle?.passengerSeat} Adults
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Booking Details */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ borderRadius: 2, p: 3, position: "sticky", top: 20, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Booking Details
            </Typography>

            <Box mb={3}>
              <Chip label="Available" color="success" sx={{ mb: 2 }} />
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Rs {vehicle?.pricePerHour.toLocaleString()}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                per hour
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Date and Time Selection */}
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
              Trip Dates and Times
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <TextField
                  label="Start Date & Time"
                  type="datetime-local"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="End Date & Time"
                  type="datetime-local"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            {/* Hours Difference */}
            <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
                Rental Duration
              </Typography>
              <Typography variant="body1">{hoursDifference} hours</Typography>
            </Box>

            {/* Price Summary */}
            <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
                Price Summary
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">
                  Rs {vehicle?.pricePerHour.toLocaleString()} × {hoursDifference} hours
                </Typography>
                <Typography variant="body2">Rs {totalPrice.toLocaleString()}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Total
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Rs {totalPrice.toLocaleString()}
                </Typography>
              </Box>
            </Box>

            {/* Booking Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleBooking}
              sx={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Book Now
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Notification */}
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CarDetailPage;