import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          padding: 4,
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Left Column - Car Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <img
            src="https://imgd.aeplcdn.com/642x336/n/q4eko3a_1582595.jpg?q=80"
            alt="BMW Car"
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Right Column - Text and Button */}
        <Box
          sx={{
            flex: 1,
            textAlign: "left",
            padding: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              color: "#000",
            }}
          >
            "Your Journey Begins Here – Rent the Perfect Ride Today!"
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 4,
              color: "#555",
            }}
          >
            Choose from a range of premium and budget vehicles for your travel needs. Book now and
            enjoy hassle-free rides tailored to your journey.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Book Now
          </Button>
        </Box>
      </Box>

      {/* Adventure Packages */}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", marginBottom: 4 }}>
          Our Adventure Packages
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              id: 1,
              title: "Mustang",
              details: "3 Night 4 days\nFooding and lodging\nVehicle: Offroad\nStarts from Kathmandu",
              price: "Npr: 16,000",
              image: "https://i.ytimg.com/vi/8cDvYXCZad8/maxresdefault.jpg",
            },
            {
              id: 2,
              title: "Pokhara",
              details: "2 Night 3 days\nFooding and lodging\nVehicle: Scorpio\nStarts from Kathmandu",
              price: "Npr: 14,000",
              image: "https://tripjive.com/wp-content/uploads/2024/09/Top-10-Things-to-Do-in-Pokhara.jpg",
            },
            {
              id: 3,
              title: "Lumbini",
              details: "2 Night 3 days\nFooding and lodging\nVehicle: Deluxe Bus\nStarts from Kathmandu",
              price: "Npr: 15,000",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSZ-sTZ0TbKEcityxP1Z0tpOxzYqgwi7G4RQ&s",
            },
          ].map((packageItem) => (
            <Grid item xs={12} sm={6} md={4} key={packageItem.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  image={packageItem.image}
                  alt={packageItem.title}
                  sx={{
                    objectFit: "cover",
                    borderRadius: "4px 4px 0 0",
                    width: "100%",
                    aspectRatio: "16/9",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    {packageItem.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                    {packageItem.details}
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    {packageItem.price}
                  </Typography>
                </CardContent>
                <Box sx={{ padding: 2, textAlign: "center" }}>
                  <Button variant="contained" color="primary" fullWidth>
                    Book Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Contact Us
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          Email: support@rentacar.com | Phone: +977 9829697282
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 3 }}>
          Address: 12 battisputali Street, Kathmandu, Nepal
        </Typography>
        <Typography variant="body2">
          © {new Date().getFullYear()} Rent A Car. All Rights Reserved.
        </Typography>
      </Box>
    </div>
  );
}
  