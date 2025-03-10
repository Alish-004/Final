import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          maxWidth: 345,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          boxShadow: 3,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)", // Scale up card on hover
            boxShadow: 8, // Enhance shadow on hover
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: 200, // Fixed height for uniform image display
            objectFit: "contain", // Ensures the entire image fits within the bounds
            aspectRatio: "16/9", // Optional: maintains a consistent aspect ratio
          }}
          image={"http://localhost:4000/uploads/"+vehicle.imageUrl.split("\\")[1]}
          alt={vehicle.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {vehicle.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3, // Limit to 3 lines
              overflow: "hidden",
            }}
          >
            {vehicle.description}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
           Rs {vehicle.pricePerHour} / Hour
          </Typography>
        </CardContent>
        <Box sx={{ p: 2 }}>
          {true ? (
            <Link to={"/cardetails"} style={{ textDecoration: "none" }}>
               <Button  variant="contained" color="primary" fullWidth>
              Details
              </Button> 
            </Link>
          ) : (
            <Button variant="outlined" color="secondary" fullWidth disabled>
              Not Available
            </Button>
          )}
        </Box>
      </Card>
    </Grid>
  );
}
