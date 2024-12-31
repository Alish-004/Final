import React from 'react';
import { Container, Box, Typography } from '@mui/material';

// AboutUsApp Component (without Navbar)
const AboutUsApp = () => {
  return (
    <Box sx={{ padding: '20px 0', minHeight: 'calc(100vh)' }}>
      <Home />
      <AboutUs />
    </Box>
  );
};

// Home Component
const Home = () => {
  const containerStyle = {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '800px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Container>
      <Box style={containerStyle}>
        <Typography variant="h4" style={{ color: '#004aad', marginBottom: '16px' }}>
          Welcome to Vehicle Rental
        </Typography>
        <Typography variant="body1" style={{ color: '#555', lineHeight: '1.6' }}>
          Your one-stop solution for renting cars, bikes, and trucks. Explore our wide range of vehicles to suit your needs. Enjoy seamless and affordable
          rentals for every journey.
        </Typography>
      </Box>
    </Container>
  );
};

// About Us Component
const AboutUs = () => {
  const containerStyle = {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '800px',
  };

  const titleStyle = {
    marginBottom: '16px',
    color: '#004aad',
    fontWeight: 'bold',
  };

  const paragraphStyle = {
    marginBottom: '12px',
    color: '#555',
    lineHeight: '1.6',
  };

  return (
    <Container>
      <Box style={containerStyle}>
        <Typography variant="h4" style={titleStyle}>
          About Us
        </Typography>
        <Typography variant="body1" style={paragraphStyle}>
          Welcome to our vehicle rental service! We are a premier vehicle rental company committed to providing you with top-notch vehicles for all your travel needs.
          Whether you need a car for a weekend getaway, a bike for a quick city commute, or a truck for moving, we've got you covered.
        </Typography>
        <Typography variant="body1" style={paragraphStyle}>
          Our mission is to offer affordable, reliable, and convenient rental solutions to individuals and businesses alike. With a wide range of vehicles and
          exceptional customer service, we strive to make every journey a memorable one.
        </Typography>
        <Typography variant="body1" style={paragraphStyle}>
          Why choose us? Our fleet is regularly serviced and updated to ensure safety and comfort. We also provide flexible rental options and competitive pricing
          to suit your budget.
        </Typography>
        <Typography variant="h6" style={{ marginTop: '20px', color: '#004aad' }}>
          Let’s get you moving!
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUsApp;
