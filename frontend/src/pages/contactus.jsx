import React from "react";
import { Box, Container, Grid, Card, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#1976d2",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
}));

export default function ContactUs() {
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
          Contact Us
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            marginBottom: 4,
            color: "#555",
          }}
        >
          Get in touch with us for inquiries, feedback, or assistance. We'd love to hear from you!
        </Typography>
      </Container>

      {/* Contact Content */}
      <Container>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Contact Information
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Location:</strong> 18 battisputali, Kathmandu, Nepal
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Phone:</strong> +977- 98137382883
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Email:</strong> journeywheel@gmail.com
              </Typography>
            </StyledCard>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Send Us a Message
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 3 }}>
                Fill out the form below and we'll get back to you as soon as possible.
              </Typography>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Your Email"
                      variant="outlined"
                      type="email"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Your Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledButton
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Send Message
                    </StyledButton>
                  </Grid>
                </Grid>
              </form>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
