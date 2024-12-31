import React from "react";
import { Container, Box, Typography, TextField, Button, Link, Grid, Paper } from "@mui/material";

const MaterialSignUpPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" gutterBottom>
            Create an Account
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Start your journey with EasyRent today!
          </Typography>
        </Box>

        <form>
          {/* First Name Field */}
          <Box mb={3}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              required
              sx={{ borderRadius: "8px" }}
            />
          </Box>

          {/* Last Name Field */}
          <Box mb={3}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              required
              sx={{ borderRadius: "8px" }}
            />
          </Box>

          {/* Email Field */}
          <Box mb={3}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              required
              sx={{ borderRadius: "8px" }}
            />
          </Box>

          {/* Password Field */}
          <Box mb={3}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              required
              sx={{ borderRadius: "8px" }}
            />
          </Box>

          {/* Phone Number Field */}
          <Box mb={3}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              required
              sx={{ borderRadius: "8px" }}
            />
          </Box>

          {/* Address Field */}
          <Box mb={3}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              required
              sx={{ borderRadius: "8px" }}
            />
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{
              paddingY: 1,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#f5a623", // Custom hover color
              },
            }}
          >
            Sign Up
          </Button>
        </form>

        {/* Login Link */}
        <Grid container justifyContent="center" mt={2}>
          <Grid item>
            <Link href="/login" underline="hover" color="primary">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MaterialSignUpPage;
