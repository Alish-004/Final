import React from "react";
import { Container, Grid, Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VehicleCard from "../comonents/VehicleCard";

const theme = createTheme();

const vehicles = [
  {
    id: 1,
    name: "Maruti Suzuki 800",
    description: " A compact and fuel-efficient city car, perfect for daily commutes and tight parking spaces.",
    pricePerDay: "Rs. 700",
    image: "https://i.ytimg.com/vi/JYssnxrD47Q/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLDyM-kgss6ry0iSIhga1k-cLaRbUw",
    available: true,
  },
  {
    id: 2,
    name: "Alto",
    description: " A small and practical hatchback known for its affordability, low maintenance.",
    pricePerDay: "$70",
    image: "https://th.bing.com/th/id/R.1a2109aafe45eb42bf243b1e25265628?rik=vBUCRLqzUkvFNA&pid=ImgRaw&r=0",
    available: true,
  },
  {
    id: 3,
    name: "Hyundai Santro",
    description: " A popular city car with a spacious interior, great fuel efficiency, and a smooth driving experience.",
    pricePerDay: "$150",
    image: "https://images.91wheels.com/assets/b_images/main/models/profile/profile1661771084.jpg",
    available: true,
  },
  {
    id: 4,
    name: "Suzuki WagonR",
    description: "A reliable car perfect for everyday use with great fuel efficiency.",
    pricePerDay: "$40",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/2/382327873/WL/AY/HB/211423081/maruti-suzuki-wagonr-rental-services-500x500.jpg",
    available: true,
  },
  {
    id: 4,
    name: "Hyundai Grand i10",
    description: "A reliable car perfect for everyday use with great fuel efficiency.",
    pricePerDay: "$40",
    image: "https://laxmihyundai.com/assets/frontend/images/cars/grand-i10/highlights/gallery/1.jpg",
    available: true,
  },
  {
    id: 4,
    name: "Honda Civic",
    description: "A reliable car perfect for everyday use with great fuel efficiency.",
    pricePerDay: "$40",
    image: "https://via.placeholder.com/300x200?text=Honda+Civic",
    available: true,
  },
  {
    id: 4,
    name: "Honda Civic",
    description: "A reliable car perfect for everyday use with great fuel efficiency.",
    pricePerDay: "$40",
    image: "https://via.placeholder.com/300x200?text=Honda+Civic",
    available: true,
  },
  {
    id: 4,
    name: "Honda Civic",
    description: "A reliable car perfect for everyday use with great fuel efficiency.",
    pricePerDay: "$40",
    image: "https://via.placeholder.com/300x200?text=Honda+Civic",
    available: true,
  }
];



export default function VehicleRental() {
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