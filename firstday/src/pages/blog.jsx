import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Road Trips to Take with a Rental Car",
    image: "https://via.placeholder.com/400x200",
    description:
      "Discover the most scenic routes and hidden gems you can explore with our rental cars.",
    link: "/blog/road-trips",
  },
  {
    id: 2,
    title: "How to Choose the Right Car for Your Journey",
    image: "https://via.placeholder.com/400x200",
    description:
      "Learn how to pick the perfect car for your trip based on comfort, budget, and more.",
    link: "/blog/choose-car",
  },
  {
    id: 3,
    title: "Essential Tips for First-Time Renters",
    image: "https://via.placeholder.com/400x200",
    description:
      "A beginner's guide to renting a car, including insurance, mileage, and terms.",
    link: "/blog/renting-tips",
  },
];

export default function BlogPage() {
  return (
    <Box sx={{ marginTop: 8, padding: 2, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Page Header */}
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            marginBottom: 2,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Our Blog
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            marginBottom: 4,
            color: "#555",
          }}
        >
          Stay updated with the latest tips, trends, and guides for your car rental experience.
        </Typography>
      </Container>

      {/* Blog Cards */}
      <Container>
        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={post.image}
                  alt={post.title}
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    {post.description}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  href={post.link}
                  sx={{
                    margin: 2,
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    textTransform: "none",
                  }}
                >
                  Read More
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
