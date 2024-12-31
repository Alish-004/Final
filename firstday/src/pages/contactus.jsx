import React from "react";
import { Box, Typography, TextField, Button, Grid, Container, Paper } from "@mui/material";
import { styled } from "@mui/system";

// Styled components
const FormWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  backgroundColor: "#f9f9f9",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
  },
}));

const BackgroundContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #4facfe, #00f2fe)", // Gradient background
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  margin: "0 auto",
}));

const ContactUs = () => {
  return (
    <Container maxWidth="lg">
      <BackgroundContainer>
        <Grid container justifyContent="center" spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h3" sx={{ color: "#fff", fontWeight: "bold", mb: 3 }}>
                Contact Information
              </Typography>
              <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                <strong>Location:</strong> 1234 Main Street, Kathmandu, Nepal
              </Typography>
              <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                <strong>Phone:</strong> +977-123-456-789
              </Typography>
              <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                <strong>Email:</strong> contact@company.com
              </Typography>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <FormWrapper>
              <Box textAlign="center" sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                  Get in Touch
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                  We'd love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
                </Typography>
              </Box>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      required
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      variant="outlined"
                      type="email"
                      required
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{
                        padding: "12px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#00f2fe",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormWrapper>
          </Grid>
        </Grid>
      </BackgroundContainer>
    </Container>
  );
};

export default ContactUs;
